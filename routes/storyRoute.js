const router = require("express").Router();

const storyController = require("../controllers/storyController");
const authentication = require("../middlewares/authentication");
const { uploadImages } = require("../middlewares/imageupload");
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
router.post(
	"/api/v1/bookmark",
	authentication("_id"),
	storyIdValidation,
	validationErrorHandler,
	storyController.bookmark
);
router.post(
	"/api/v1/removeBookmark",
	authentication("_id"),
	storyIdValidation,
	validationErrorHandler,
	storyController.removeBookmark
);

router.get(
	"/api/v1/stories",
	storyIdValidation,
	validationErrorHandler,
	authentication("_id interests following"),
	storyController.getStories
);
router.get("/api/v1/story", authentication("_id"), storyController.getStory);
router.get(
	"/api/v1/getStoryClappers",
	storyIdValidation,
	validationErrorHandler,
	authentication("_id"),
	storyController.getStoryClappers
);
router.get(
	"/api/v1/getUserStories",
	storyIdValidation,
	validationErrorHandler,
	// authentication("_id"),
	storyController.getUserStories
);

module.exports = router;
