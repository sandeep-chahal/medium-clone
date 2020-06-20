const Story = require("../models/story");
const User = require("../models/user");

exports.createStory = async (req, res, next) => {
	// get data
	const title = req.body.title;
	const body = req.body.body;
	const tags = req.body.tags;
	const author = req.user._id;
	const img = req.filename;

	console.log({ title, body, img, tags, author });

	// create story
	const story = await Story.create({ title, body, img, tags, author });

	// add story to user document
	await User.findByIdAndUpdate(author, {
		$push: { stories: story._id },
	});

	res.json({ result: "success", story });
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

	// if already clapped then remove clap else clap
	if (clapped) {
		await Story.findByIdAndUpdate(storyId, {
			$pull: {
				claps: userId,
			},
		});
		await User.findByIdAndUpdate(userId, {
			$pull: {
				claps: storyId,
			},
		});
	} else {
		await Story.findByIdAndUpdate(storyId, {
			$push: {
				claps: userId,
			},
		});
		await User.findByIdAndUpdate(userId, {
			$push: {
				claps: storyId,
			},
		});
	}

	res.json({ result: "success" });
};
