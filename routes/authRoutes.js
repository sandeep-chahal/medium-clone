const router = require("express").Router();

const authController = require("../controllers/authController");
const { singleImage } = require("../middlewares/imageupload");
const {
	signupValidation,
	validationErrorHandler,
} = require("../middlewares/validation");

router.post(
	"/api/v1/signup",
	singleImage,
	signupValidation,
	validationErrorHandler,
	authController.postSignup
);

module.exports = router;
