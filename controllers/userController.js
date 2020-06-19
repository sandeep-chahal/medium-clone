const User = require("../models/user");
const sendMail = require("../utils/sendMail");
const { deleteUserImages } = require("../utils/deleteImage");

exports.sendVerificationMail = async (req, res, next) => {
	// get user
	const user = req.user;

	// check if already verified
	if (user.emailVerified && user.emailVerified.isVerfied)
		return res.json({ result: "error", errors: [{ msg: "alredy verified!" }] });

	let _token =
		user.emailVerified &&
		user.emailVerified.token &&
		user.emailVerified.token.value &&
		user.emailVerified.expires > Date.now() &&
		user.emailVerified.token.value;

	// generate and saving  a verification token
	let token = _token || (await User.createToken());
	user.emailVerified = {
		isVerfied: false,
		token: {
			value: token,
			expires: Date.now() + 1000 * 60 * 10,
		},
	};
	await user.save();

	// create link
	let link = `${req.protocol}://${req.get("host")}/api/v1/verifyEmail?email=${
		user.email
	}&token=${token}`;

	// send e-mail
	const result = await sendMail(user.email, "e-verify", link);

	return res.json({
		result: result ? "success" : "error",
	});
};

exports.verifyEmail = async (req, res, next) => {
	const email = req.query.email;
	const token = req.query.token;

	const user = await User.findOne({
		email,
		"emailVerified.token.value": token,
		"emailVerified.token.expires": { $gt: Date.now() },
	}).select("emailVerified");

	if (!user) return res.send("Token Expired!");

	user.emailVerified = {
		isVerfied: true,
		token: null,
	};
	await user.save();

	res.send("Email Verifed!");
};

exports.updateProfilePic = async (req, res, next) => {
	// get old profile pic
	const oldImg = req.user.img;

	// update profile pic
	req.user.img = req.file.filename;
	await req.user.save();

	// delete old profile pic
	deleteUserImages(oldImg);

	res.status(201).json({
		result: "success",
		data: {
			img: req.user.img,
		},
	});
};

exports.follow = async (req, res, next) => {
	const user = req.user;
	const userToFollow = req.body.id;

	const result = await User.findOneAndUpdate(
		{
			_id: user._id,
			following: { $nin: userToFollow },
		},
		{ $push: { following: userToFollow } }
	).select("_id");
	if (result) {
		await User.findByIdAndUpdate(userToFollow, {
			$push: { follower: user._id },
		});
	}

	res.json({ result: result ? "success" : "error" });
};
exports.unfollow = async (req, res, next) => {
	const user = req.user;
	const userToUnfollow = req.body.id;

	const result = await User.findOneAndUpdate(
		{
			_id: user._id,
			following: { $in: userToUnfollow },
		},
		{ $pull: { following: userToUnfollow } }
	).select("_id");
	if (result) {
		await User.findByIdAndUpdate(userToUnfollow, {
			$pull: { follower: user._id },
		});
	}
	res.json({ result: result ? "success" : "error" });
};

exports.setPrefrence = async (req, res, next) => {
	req.user.prefrence = req.body.prefrence;
	await req.user.save();

	res.status(201).json({ result: "success" });
};
