const jwt = require("jsonwebtoken");
const User = require("../models/user");
const sendMail = require("../utils/sendMail");
const { renderSync } = require("node-sass");

const createAndSendJWTToken = (id, res) => {
	const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
	res.cookie("jwtToken", token, {
		maxAge: 1000 * 60 * 60,
		httpOnly: true,
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

	//creating and sending jwt token
	createAndSendJWTToken(user._id, res);

	// sending success response
	res.status(201).json({
		result: "success",
		user: { name: user.name, img: user.img },
	});
};

exports.postLogin = async (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;

	const user = await User.findOne({ email }).select("name img password");
	if (!user || !(await User.isPasswordValid(password, user.password)))
		return res.status(400).json({
			result: "error",
			errors: [{ msg: "Invalid Credentials!", param: "auth" }],
		});

	createAndSendJWTToken(user._id, res);
	return res.status(200).json({
		result: "success",
		user: { name: user.name, img: user.img },
	});
};

exports.forgotPassword = async (req, res, next) => {
	const email = req.body.email;

	//get user
	const user = req.user;

	// get resetToken from req(injected from validator)
	let resetToken = req.resetToken;
	// create a  link to send in email
	let link = `${req.protocol}://${req.get(
		"host"
	)}/resetPassoword?email=${email}&token=`;

	// create new token, if not available
	if (!resetToken) {
		resetToken = User.createToken();

		user.passwordResetToken = {
			token: resetToken,
			expires: Date.now() + 1000 * 60 * 10,
		};
		await user.save();
	}

	//send mail
	link += resetToken;
	const result = await sendMail(email, "pwd", link);
	console.log(link);

	return res.json({
		result: result ? "success" : "error",
	});
};

exports.resetPassoword = async (req, res, next) => {
	const user = req.user;
	const password = req.body.password;

	// change password and save
	user.password = await User.encryptPassword(password);
	user.lastChangedPassword = Date.now();
	user.passwordResetToken = null;
	await user.save();

	// create and send jwt token
	createAndSendJWTToken(user._id, res);

	res.status(201).json({
		result: "success",
		user: { name: user.name, img: user.img },
	});
};

exports.getUser = async (req, res, next) => {
	res.json({ user: req.user });
};
