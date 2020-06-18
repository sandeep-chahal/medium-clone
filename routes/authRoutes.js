const router = require("express").Router();

const authController = require("../controllers/authController");
const { singleImage } = require("../middlewares/imageupload");
const {
	loginValidation,
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
router.post(
	"/api/v1/login",
	loginValidation,
	validationErrorHandler,
	authController.postLogin
);

module.exports = router;
