const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
var cookieParser = require("cookie-parser");

require("dotenv").config();

const authRoute = require("./routes/authRoutes");
const userRoute = require("./routes/userRoutes");
const storyRoute = require("./routes/storyRoute");

const app = express();

//json parser
app.use(express.json());

// cookie parser
app.use(cookieParser());

// routes
app.use(authRoute);
app.use(userRoute);
app.use(storyRoute);

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		app.listen(process.env.PORT || 5000);
	})
	.catch((err) => {
		console.log(err);
	});
