const router = require("express").Router();

const storyController = require("../controllers/storyController");
const authentication = require("../middlewares/authentication");
const { uploadImages } = require("../middlewares/imageupload");
const {
	validationErrorHandler,
	createStoryValidation,
} = require("../middlewares/validation");

router.post(
	"/api/v1/createStory",
	authentication("_id"),
	uploadImages(),
	createStoryValidation,
	validationErrorHandler,
	storyController.createStory
);

module.exports = router;
