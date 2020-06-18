const { body, validationResult } = require("express-validator");

const User = require("../models/user");
const { deleteUserImages } = require("../utils/deleteImage");

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
		if (!feildErrors.isEmpty() && req.file) deleteUserImages(req.file.filename);

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
				if (await User.findOne({ email: val })) {
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
};
