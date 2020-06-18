const router = require("express").Router();

const authController = require("../controllers/authController");
const {
	signupValidation,
	validationErrorHandler,
} = require("../middlewares/validation");

router.post(
	"/api/v1/signup",
	signupValidation,
	validationErrorHandler,
	authController.postSignup
);

module.exports = router;
