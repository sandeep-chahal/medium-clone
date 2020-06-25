var multer = require("multer");
const sharp = require("sharp");
const easyPath = require("../utils/easyPath")(__dirname);

//check if file is image or not
const fileFilter = (req, file, callback) => {
	const isValidType = ["image/jpeg", "image/tiff", "image/png"].includes(
		file.mimetype
	);
	callback(null, isValidType);
};

// init upload
const uploadSignle = multer({
	storage: multer.memoryStorage(),
	fileFilter,
	limits: {
		fileSize: 1024 * 1024 * 5,
	},
}).single("img");

exports.singleImage = (req, res, next) => {
	try {
		uploadSignle(req, res, (err) => {
			if (err || !req.file) {
				const errors = [];
				if (err && err.code === "LIMIT_FILE_SIZE")
					errors.push({
						msg: "Please upload file with less than 5MB size!",
						param: "img",
					});
				else if (!req.file)
					errors.push({
						msg: "please upload a valid image file",
						param: "img",
					});
				req.fileErrors = errors;
			} else if (req.file && req.file.buffer) {
				const fileName = String(Date.now());
				sharp(req.file.buffer)
					.resize(80, 80)
					.toFormat("jpeg")
					.jpeg({ quality: 80 })
					.toFile(`public/uploads/${fileName}-60px.jpeg`);
				sharp(req.file.buffer)
					.resize(300, 300)
					.toFormat("jpeg")
					.jpeg({ quality: 80 })
					.toFile(`public/uploads/${fileName}-250px.jpeg`);
				req.file.filename = `${req.protocol}://${req.get(
					"host"
				)}/uploads/${fileName}`;
			}
			next();
		});
	} catch (err) {
		console.log("---------img error ----------------------");
		console.log(err);
		req.fileErrors = [
			{ msg: "something went wrong while uploading file.", param: "img" },
		];
		next();
	}
};

// upload multiple

const uploadMultiple = multer({
	storage: multer.memoryStorage(),
	fileFilter,
	limits: {
		fileSize: 1024 * 1024 * 5,
	},
}).fields([
	{ name: "img1", maxCount: 1 },
	{ name: "img2", maxCount: 1 },
	{ name: "img3", maxCount: 1 },
	{ name: "img4", maxCount: 1 },
	{ name: "img5", maxCount: 1 },
]);

exports.uploadImages = (req, res, next) => {
	const filename = Date.now();
	req.filename = filename;
	const errors = [];
	try {
		uploadMultiple(req, res, (err) => {
			if (err && err.code === "LIMIT_FILE_SIZE")
				errors.push({
					msg: "Please upload file with less than 5MB size!",
					param: "img",
				});
			if (req.files)
				for (let file of Object.values(req.files)) {
					file = file[0];
					sharp(file.buffer)
						.resize(250, 250)
						.toFormat("jpeg")
						.jpeg({ quality: 80 })
						.toFile(`public/uploads/${filename}-${file.fieldname}-250px.jpeg`);

					sharp(file.buffer)
						.toFormat("jpeg")
						.jpeg({ quality: 80 })
						.toFile(
							`public/uploads/${filename}-${file.fieldname}-original.jpeg`
						);
				}
			req.fileErrors = errors;
			next();
		});
	} catch (err) {
		console.log("----------------------");
		console.log(err);
		errors.push({
			msg: "something went wrong while uplaoding images!",
			param: "img",
		});
		req.fileErrors = errors;
		next();
	}
};
