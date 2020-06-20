const router = require("express").Router();

const storyController = require("../controllers/storyController");
const authentication = require("../middlewares/authentication");
const { uploadImages, uploadNone } = require("../middlewares/imageupload");
const {
	validationErrorHandler,
	createStoryValidation,
	storyIdValidation,
} = require("../middlewares/validation");

router.post(
	"/api/v1/createStory",
	authentication("_id"),

	uploadImages,
	createStoryValidation,
	validationErrorHandler,
	storyController.createStory
);
router.post(
	"/api/v1/deleteStory",
	authentication("_id"),
	storyIdValidation,
	validationErrorHandler,
	storyController.deleteStory
);
router.post(
	"/api/v1/clap",
	authentication("_id"),
	storyIdValidation,
	validationErrorHandler,
	storyController.clap
);

module.exports = router;
