const router = require("express").Router();
const userController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const { sendVerificationMailValidator } = require("../middlewares/validation");

router.get(
	"/api/v1/sendVerificationMail",
	authentication,
	userController.sendVerificationMail
);

router.get("/api/v1/verifyEmail", userController.verifyEmail);
module.exports = router;
