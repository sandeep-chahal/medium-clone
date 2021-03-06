const Story = require("../models/story");
const User = require("../models/user");
var cron = require("node-cron");

let trendingStories = [];

// -------------setters---------------------
exports.createStory = async (req, res, next) => {
	// get data
	const title = req.body.title;
	const body = req.body.body;
	const summary = req.body.summary;
	const tags = req.body.tags.split(",").map((tag) => tag.trim());
	const author = req.user._id;
	const img = req.file.filename;

	// create story
	const story = await Story.create({ title, body, img, tags, author, summary });

	// add story to user document
	await User.findByIdAndUpdate(author, {
		$push: { stories: story._id },
	});

	res.json({ result: "success", story: { _id: story._id } });
};

exports.deleteStory = async (req, res, next) => {
	const storyId = req.body.id;
	const userId = req.user._id;

	// deleteing from story model
	await Story.findByIdAndRemove(storyId);

	// deleteing from user model
	await User.findByIdAndUpdate(userId, {
		$pull: { stories: storyId },
	});

	res.json({
		result: "success",
	});
};

exports.clap = async (req, res, next) => {
	const storyId = req.body.id;
	const userId = req.user._id;

	// check if already clapped
	const clapped = await Story.findOne({
		_id: storyId,
		claps: {
			$in: userId,
		},
	}).select("_id");

	if (clapped) return res.json({ result: "success" });
	Promise.all([
		Story.findByIdAndUpdate(storyId, {
			$push: {
				claps: userId,
			},
		}),
		User.findByIdAndUpdate(userId, {
			$push: {
				claps: storyId,
			},
		}),
	]);

	res.json({ result: "success" });
};

exports.bookmark = async (req, res, next) => {
	const storyId = req.body.id;
	const userId = req.user._id;

	console.log(storyId);

	await User.findByIdAndUpdate(userId, {
		$push: {
			bookmark: storyId,
		},
	});

	res.json({
		result: "success",
	});
};
exports.removeBookmark = async (req, res, next) => {
	const storyId = req.body.id;
	const userId = req.user._id;

	await User.findByIdAndUpdate(userId, {
		$pull: {
			bookmark: storyId,
		},
	});
	res.json({
		result: "success",
	});
};

// ----------getters-------------------
exports.getStories = async (req, res, next) => {
	const intersets = req.user.interests;
	const following = req.user.following;
	const page = req.query.page || 1;
	const limit = req.query.limit || 10;
	const trending = req.query.getTrending == "true";

	const skip = page * limit - limit;

	const stories = await Story.find({
		$or: [
			{
				tags: {
					$elemMatch: { $in: intersets },
				},
			},
			{
				author: {
					$in: following,
				},
			},
		],
	})
		.skip(skip)
		.limit(limit)
		.populate("author", "img name _id")
		.lean(true);
	let trendingStories = [];
	if (trending) {
		trendingStories = await getTrending();
	}
	res.json({
		result: "success",
		data: { trendingStories, stories, length: stories.length },
	});
};

exports.getStory = async (req, res, next) => {
	const storyId = req.query.id;

	const storyQuery = Story.findById(storyId)
		.populate("author", "name img")
		.lean();
	const bookmarkedQuery = User.findOne({
		_id: req.user._id,
		bookmark: {
			$in: storyId,
		},
	})
		.select("_id")
		.lean();

	let story = null;
	Promise.all([storyQuery, bookmarkedQuery]).then(
		async ([story, bookmarked]) => {
			const following = await User.findOne({
				_id: req.user._id,
				following: {
					$in: story.author._id,
				},
			})
				.select("_id")
				.lean();
			story = { bookmarked: !!bookmarked, following: !!following, ...story };
			res.json({
				result: "success",
				data: {
					story,
				},
			});
		}
	);
};

exports.getStoryClappers = async (req, res, next) => {
	const storyId = req.query.id;

	const story = await Story.findById(storyId)
		.select("claps")
		.populate("claps", "name img");

	res.json({
		result: "success",
		data: {
			clappers: story ? story.claps : null,
			length: story ? story.claps.length : 0,
		},
	});
};
exports.getUserStories = async (req, res, next) => {
	const userId = req.query.id;
	// const page = req.query.page;
	// const skip = page * 5 - 5;

	const user = await User.findById(userId)
		.select("stories name _id img")
		.populate("stories", "title _id summary createdAt");

	if (!user)
		return res.json({
			result: "error",
			errors: [{ msg: "No user found" }],
		});
	let isFollowing;
	if (userId !== req.user._id)
		isFollowing = await User.findOne({
			_id: req.user._id,
			following: {
				$in: userId,
			},
		});

	res.json({
		result: "success",
		data: {
			user: {
				_id: user._id,
				name: user.name,
				img: user.img,
				isFollowing: !!isFollowing,
			},
			stories: user.stories,
			length: user.stories.length,
		},
	});
};

exports.getBookmark = async (req, res, next) => {
	const userId = req.user.id;

	const user = await User.findById(userId)
		.select("bookmark name img")
		.populate("bookmark");

	res.json({
		result: "success",
		data: {
			stories: user.bookmark,
			length: user.bookmark.length,
		},
	});
};

const getTrending = async () => {
	let stories = [];
	for (let { _id } of trendingStories) {
		const story = await Story.findById(_id)
			.select("_id title summary author createdAt")
			.lean();
		stories.push(story);
	}
	return stories;
};

// get trending stories every day
const findTrending = async () => {
	const stories = await Story.find({}).sort("claps").limit(5).select("_id");
	trendingStories = stories;
};
cron.schedule("0 1 * * *", findTrending);

findTrending();
