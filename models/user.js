const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

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
		token: {
			value: String,
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
userSchema.statics.isPasswordValid = async (password, encPassword) => {
	const isvalid = await bcrypt.compare(password, encPassword);
	return isvalid;
};

userSchema.statics.createToken = function () {
	return crypto.randomBytes(32).toString("hex");
};

module.exports = mongoose.model("User", userSchema);
