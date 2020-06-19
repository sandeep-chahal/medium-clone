const Story = require("../models/story");
const User = require("../models/user");

exports.createStory = async (req, res, next) => {
	// get data
	const title = req.body.title;
	const body = req.body.body;
	const tags = req.body.tags;
	const author = req.user._id;
	const img = req.filename;

	// create story
	const story = await Story.create({ title, body, img, tags, author });

	// add story to user document
	await User.findByIdAndUpdate(author, {
		$push: { stories: story._id },
	});

	res.json({ result: "success", story });
};
