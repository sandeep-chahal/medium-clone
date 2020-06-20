const mongoose = require("mongoose");
const { check, body, validationResult } = require("express-validator");

const User = require("../models/user");
const { deleteUserImages, deleteStoryImages } = require("../utils/deleteImage");

module.exports = {
	validationErrorHandler: (req, res, next) => {
		let errors = [];

		//getting errors from validator
		const feildErrors = validationResult(req);
		if (!feildErrors.isEmpty())
			errors = feildErrors.array().map((error) => ({
				msg: error.msg,
				param: error.param,
			}));

		//getting image upload errors
		if (req.fileErrors && req.fileErrors.length) {
			errors = [...errors, ...req.fileErrors];
		}

		//delete uploaded images if error
		if (!feildErrors.isEmpty() && (req.file || req.filename)) {
			if (req.file) deleteUserImages(req.file.filename);
			else if (req.filename) {
				console.log(req.filename);
				deleteStoryImages(req.filename);
			}
		}

		if (errors.length) {
			//sending errors if any
			return res.status(422).json({
				result: "error",
				errors: errors,
			});
		} else next();
	},
	signupValidation: [
		body("email", "Inavlid Email!")
			.trim()
			.isEmail()
			.isLength({ max: 50 })
			.custom(async (val) => {
				if (await User.findOne({ email: val }).select("_id")) {
					throw new Error("Email already Exist!");
				} else return true;
			})
			.normalizeEmail(),
		body("name", "Name length must be between 2 and 20 char long!")
			.trim()
			.isLength({
				min: 2,
				max: 20,
			}),
		body("password", "Password length must be between 6 and 16 char long!")
			.trim()
			.isLength({ min: 6, max: 16 }),
		body(
			"confirmPassword",
			"Confirm password Doesn't match"
		).custom((val, { req }) => (val !== req.body.password ? false : true)),
	],
	loginValidation: [
		body("email", "Invalid Credentials!").isEmail().normalizeEmail(),
		body("password", "Invalid Credentials!")
			.trim()
			.isLength({ min: 6, max: 16 }),
	],
	forgotPasswordValidation: [
		body("email", "Inavlid Email!")
			.trim()
			.isEmail()
			.isLength({ max: 50 })
			.custom(async (email, { req }) => {
				const user = await User.findOne({ email }).select("passwordResetToken");
				if (!user) throw new Error("No account found  on this Email!");
				else {
					if (
						user.passwordResetToken &&
						user.passwordResetToken.token &&
						user.passwordResetToken.expires > Date.now()
					) {
						req.resetToken = user.passwordResetToken.token;
					}
					req.user = user;
					return true;
				}
			})
			.normalizeEmail(),
	],
	resetPasswordValidation: [
		body("email", "Inavlid Email!")
			.trim()
			.isEmail()
			.isLength({ max: 50 })
			.custom(async (email, { req }) => {
				const user = await User.findOne({ email }).select(
					"passwordResetToken password lastChangedPassword"
				);
				if (!user) throw new Error("No account found  on this Email!");
				else {
					req.user = user;
					return true;
				}
			})
			.normalizeEmail(),
		body("password", "Password length must be between 6 and 16 char long!")
			.trim()
			.isLength({ min: 6, max: 16 }),
		body("token", "Invalid/Expired token!").custom(async (token, { req }) => {
			console.log(!(req.user.passwordResetToken === token));
			console.log(req.user.passwordResetToken, token);
			if (
				!req.user.passwordResetToken ||
				req.user.passwordResetToken.token !== token ||
				req.user.passwordResetToken.expires < Date.now()
			) {
				throw new Error("Token Expired!");
			} else return true;
		}),
		body(
			"confirmPassword",
			"Confirm password Doesn't match"
		).custom((val, { req }) => (val !== req.body.password ? false : true)),
	],
	followValidation: [
		body("id").custom(async (val) => {
			if (
				!mongoose.Types.ObjectId.isValid(val) ||
				!(await User.findById(val).select("_id"))
			) {
				throw new Error("Invalid User Id!");
			} else return true;
		}),
	],
	unfollowValidation: [
		body("id").custom((val) => {
			if (!mongoose.Types.ObjectId.isValid(val)) {
				throw new Error("Invalid User Id!");
			} else return true;
		}),
	],

	interestsValidation: [body("interests", "Invalid Format").isArray()],

	createStoryValidation: [
		body("title", "title length must be between 5 and 50 character long!")
			.trim()
			.isLength({ min: 5, max: 50 })
			.custom((val) => {
				console.log(val);
			}),
		body("body", "story must have body!").isArray(),
	],

	storyIdValidation: [
		check("id").custom((val) => {
			if (!mongoose.Types.ObjectId.isValid(val)) {
				throw new Error("Story id is not valid!");
			}
			return true;
		}),
	],
};
