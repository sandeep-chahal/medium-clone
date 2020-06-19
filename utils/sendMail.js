const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const emailTemplate = require("./emailTemplate");

module.exports = async (to, type, link) => {
	const msg = {
		to,
		from: process.env.SENDGRID_VERIFED_MAIL,
		subject: `${
			type == "pwd" ? "Reset password" : "Email verifiction"
		} for medium clone!`,
		html: emailTemplate(type, link),
	};

	try {
		await sgMail.send(msg);
		return true;
	} catch (err) {
		console.log(err, err.message);
		return false;
	}
};
