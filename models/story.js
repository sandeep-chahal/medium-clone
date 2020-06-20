const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
	title: String,
	body: Array,
	img: String,
	tags: [String],
	author: {
		type: mongoose.Types.ObjectId,
		ref: "User",
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	claps: [{ type: mongoose.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Story", storySchema);
