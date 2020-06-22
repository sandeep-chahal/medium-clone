import React from "react";

const Input = ({ name, type, reg, error, watch }) => (
	<div className="input-wrapper">
		<input
			id={type === "file" ? "file" : null}
			name={name.replace(" ", "")}
			type={type ? type : "text"}
			placeholder={name}
			ref={reg({
				required: true,
				...validate(name, watch),
			})}
		/>
		<span className="error">
			{(error && error.message) || (error && errorMessages(name))}&nbsp;
		</span>
	</div>
);

const validate = (validate, watch) => {
	console.log(validate);
	switch (validate) {
		case "password":
			return {
				validate: (value) => value.length >= 6 && value.length <= 16,
			};
		case "confirm Password":
			return {
				validate: (value) => value === watch("password"),
			};
		case "name":
			return {
				validate: (value) => value.length > 2,
			};
		case "email":
			return {
				pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
			};
		default:
			return {};
	}
};

const errorMessages = (type) => {
	switch (type) {
		case "password":
			return "Password should be atleast 6 char long";
		case "confirm Password":
			return "Confirm password doesn't match";
		case "name":
			return "Name should be atleast 2 char long";
		case "email":
			return "Enter a valid email";
		case "img":
			return "Upload an valid image with less than 5mb size";
	}
};

export default Input;
