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

exports.uploadImages = (req, res, next) => {
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
						msg: "please upload a valid image file!!",
						param: "img",
					});
				req.fileErrors = errors;
			} else if (req.file && req.file.buffer) {
				const filename = String(Date.now());
				sharp(req.file.buffer)
					.resize(400, 400)
					.toFormat("jpeg")
					.jpeg({ quality: 80 })
					.toFile(`public/uploads/${filename}-400px.jpeg`);
				req.file.filename = `${req.protocol}://${req.get(
					"host"
				)}/uploads/${filename}`;
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
