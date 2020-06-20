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
	const id = req.body.id;

	// deleteing from story model
	await Story.findByIdAndRemove(id);

	// deleteing from user model
	await User.findByIdAndUpdate(req.user._id, {
		$pull: { stories: id },
	});
	console.log("-----------");
	res.json({
		result: "success",
	});
};
