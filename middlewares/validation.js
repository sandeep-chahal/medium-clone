const { body, validationResult } = require("express-validator");

const User = require("../models/user");

module.exports = {
	validationErrorHandler: (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({
				result: "error",
				errors: errors.array().map((error) => ({
					msg: error.msg,
					param: error.param,
				})),
			});
		} else next();
	},
	signupValidation: [
		body("email", "Inavlid Email!")
			.trim()
			.isEmail()
			.isLength({ max: 50 })
			.custom(async (val, { req }) => {
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
};
