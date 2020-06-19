const router = require("express").Router();
const userController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const { singleImage } = require("../middlewares/imageupload");
const { validationErrorHandler } = require("../middlewares/validation");

router.get(
	"/api/v1/sendVerificationMail",
	authentication("email emailVerified"),
	userController.sendVerificationMail
);
router.get("/api/v1/verifyEmail", userController.verifyEmail);
router.post(
	"/api/v1/updateProfilePic",
	authentication("img"),
	singleImage,
	validationErrorHandler,
	userController.updateProfilePic
);

module.exports = router;
