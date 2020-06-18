const jwt = require("jsonwebtoken");

const signJwt = (id) =>
	jwt.sign(id, process.env.JWT_SECRET, { expiresIn: "1h" });

exports.postSignup = async (req, res, next) => {};
