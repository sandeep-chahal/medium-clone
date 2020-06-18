const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	img: {
		type: String,
	},
	email: {
		type: String,
		required: true,
	},
	emailVerified: {
		isVerfied: {
			type: Boolean,
			default: false,
		},
		emailVerificationToken: {
			type: String,
			expires: date,
		},
	},
	password: {
		type: String,
		required: true,
	},
	passwordResetToken: { token: String, expires: Date },
	lastChangedPassword: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model("User", userSchema);
