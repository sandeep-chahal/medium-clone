const fs = require("fs");
const easyPath = require("../utils/easyPath")(__dirname);

exports.deleteUserImages = (name) => {
	setTimeout(async () => {
		try {
			const filename60px = `${name}-80px.jpeg`;
			const filename250px = `${name}-300px.jpeg`;
			fs.unlink(easyPath(`../public/uploads/${filename60px}`), () => {});
			fs.unlink(easyPath(`../public/uploads/${filename250px}`), () => {});
		} catch (err) {
			// console.log(err);
		}
	}, 2000);
};

exports.deleteStoryImages = (name) => {
	setTimeout(async () => {
		try {
			for (let i = 1; i < 6; i++) {
				const filename400px = `${name}-img${i}-400px.jpeg`;
				console.log(easyPath(filename400px));
				await fs.unlink(
					easyPath(`${filename400px}`),
					(err) =>
						// console.log(err)
						1
				);
			}
		} catch (err) {
			console.log("--failed to deloete story images---");
			// console.log(err.message);
		}
	}, 2000);
};
