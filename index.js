const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

//json parser
app.use(express.json());

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

mongoose
	.connect(
		process.env.MONGODB_URI || `mongodb://localhost:27017/medium-clone`,
		{ useNewUrlParser: true }
	)
	.then(() => {
		app.listen(process.env.PORT || 5000);
	})
	.catch((err) => {
		console.log(err);
	});
