const jwt = require("jsonwebtoken");
const User = require("../models/user");

const createAndSendJWTToken = (id, res) => {
	const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
	res.cookie("jwtToken", token, {
		maxAge: 1000 * 60 * 60,
	});
};

exports.postSignup = async (req, res, next) => {
	//getting felids
	const email = req.body.email;
	const name = req.body.name;
	const password = req.body.password;
	const img = req.file.filename;

	//encrypt password
	const encryptedPassword = await User.encryptPassword(password);

	//creating user
	const user = await User.create({
		name,
		email,
		password: encryptedPassword,
		img,
	});

	//craeting and sending jwt token
	createAndSendJWTToken(user._id, res);

	// sending success response
	res.status(201).json({
		result: "success",
	});
};
