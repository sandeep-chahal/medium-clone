const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
		unique: true,
		index: true,
	},
	emailVerified: {
		isVerfied: {
			type: Boolean,
			default: false,
		},
		emailVerificationToken: {
			type: String,
			expires: Date,
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

userSchema.statics.encryptPassword = async (val) => {
	const encrypted = await bcrypt.hash(val, 12);
	return encrypted;
};

module.exports = mongoose.model("User", userSchema);
