const fs = require("fs");
const easyPath = require("../utils/easyPath")(__dirname);

exports.deleteUserImages = (name) => {
	setTimeout(async () => {
		try {
			const filename60px = `${name}-60px.jpeg`;
			const filename250px = `${name}-250px.jpeg`;
			fs.unlink(easyPath(`../public/uploads/${filename60px}`), () => {});
			fs.unlink(easyPath(`../public/uploads/${filename250px}`), () => {});
		} catch (err) {
			console.log(err);
		}
	}, 2000);
};

exports.deleteStoryImages = (name) => {
	setTimeout(async () => {
		try {
			for (let i = 1; i < 6; i++) {
				const filename250px = `${name}-img${i}-250px.jpeg`;
				const filenameOriginal = `${name}-img${i}-original.jpeg`;
				await fs.unlink(easyPath(`../public/uploads/${filename250px}`), (err) =>
					console.log(err)
				);
				await fs.unlink(
					easyPath(`../public/uploads/${filenameOriginal}`),
					(err) => console.log(err)
				);
			}
		} catch (err) {
			console.log("--failed to deloete story images---");
			console.log(err.message);
		}
	}, 2000);
};
