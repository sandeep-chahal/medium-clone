const fs = require("fs");
const easyPath = require("../utils/easyPath")(__dirname);

exports.deleteUserImages = (name) => {
	try {
		const filename60px = `${name}-60px.jpeg`;
		const filename250px = `${name}-250px.jpeg`;
		fs.unlink(easyPath(`../public/uploads/${filename60px}`), () => {});
		fs.unlink(easyPath(`../public/uploads/${filename250px}`), () => {});
	} catch (err) {
		console.log(err);
	}
};
