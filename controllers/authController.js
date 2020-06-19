const jwt = require("jsonwebtoken");
const User = require("../models/user");
const sendMail = require("../utils/sendMail");

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

	//creating and sending jwt token
	createAndSendJWTToken(user._id, res);

	// sending success response
	res.status(201).json({
		result: "success",
	});
};

exports.postLogin = async (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;

	const user = await User.findOne({ email });
	if (!user || !(await User.isPasswordValid(password, user.password)))
		return res.status(400).json({
			result: "error",
			errors: [{ msg: "Invalid Credentials!" }],
		});

	createAndSendJWTToken(user._id, res);
	return res.status(200).json({
		result: "success",
	});
};

exports.forgotPassword = async (req, res, next) => {
	const email = req.body.email;

	//check if user exist!
	const user = await User.findOne({ email });
	if (!user)
		return res.status(400).json({
			result: "error",
			errors: [{ msg: "Cannot find account on this email!" }],
		});

	let resetToken = null;
	let link = `${req.protocol}://${req.get(
		"host"
	)}/resetPassoword?email=${email}&token=`;

	//get token if already in db and not expires, if not then create new token
	if (
		user.passwordResetToken &&
		user.passwordResetToken.token &&
		user.passwordResetToken.expires > Date.now()
	) {
		resetToken = user.passwordResetToken.token;
	} else {
		resetToken = User.createPasswordResetToken();

		user.passwordResetToken = {
			token: resetToken,
			expires: Date.now() + 1000 * 60 * 10,
		};
		await user.save();
	}

	//send mail
	link += resetToken;
	const result = await sendMail(email, "pwd", link);
	return res.json({
		result: result ? "success" : "error",
	});
};

exports.resetPassoword = async (req, res, next) => {
	const email = req.body.email;
	const token = req.body.token;
	const password = req.body.password;

	const user = await User.findOne({ email });

	// if no user with email then send error
	if (!user)
		return res.json({ result: "error", errors: ["No account found!"] });

	// if user does not have resetToken or it's expires
	if (
		!user.passwordResetToken ||
		!user.passwordResetToken.token === token ||
		!user.passwordResetToken.expires > Date.now()
	) {
		return res
			.status(400)
			.json({ result: "error", errors: ["Token Expired!"] });
	}

	// else change the password and lastChangedPassword
	user.password = await User.encryptPassword(password);
	user.lastChangedPassword = Date.now();
	await user.save();

	createAndSendJWTToken(user._id, res);

	res.status(201).json({
		result: "success",
	});
};
