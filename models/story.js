const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
	title: String,
	body: String,
	summary: String,
	img: String,
	tags: {
		type: [String],
		index: true,
	},
	author: {
		type: mongoose.Types.ObjectId,
		ref: "User",
		index: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	claps: [{ type: mongoose.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Story", storySchema);
