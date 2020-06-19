const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = (_select) => {
	return async (req, res, next) => {
		try {
			const token = req.cookies.jwtToken;
			const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
			if (!token || !decodedToken || !decodedToken.id) {
				throw new Error("Unauthorized");
			}

			const user = await User.findById(decodedToken.id).select(_select);
			if (!user) throw new Error("Unauthorized");

			req.user = user;
			next();
		} catch (err) {
			res.status(401).json({
				result: "error",
				errors: [{ msg: "Unauthorized" }],
			});
		}
	};
};
