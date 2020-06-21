import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

import Button from "../button/Button";

const Signup = () => {
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const { register, handleSubmit, watch, errors, setError } = useForm();
	const onSubmit = (data) => {
		if (loading) return;
		let formData = new FormData();
		formData.append("img", data.img[0]);
		formData.append("name", data.name);
		formData.append("email", data.email);
		formData.append("password", data.password);
		formData.append("confirmPassword", data.confirmPassword);

		setLoading(true);
		axios
			.post(`/api/v1/signup`, formData, {
				headers: {
					"content-type": "multipart/form-data",
				},
			})
			.then((res) => {
				if (res.data.result === "success") history.push("/");
			})
			.catch((err) => {
				if (err.response && err.response.status >= 400)
					err.response.data.errors.map((error) => {
						setError(error.param, null, error.msg);
					});
				setLoading(false);
			});
	};

	return (
		<form className="form" onSubmit={handleSubmit(onSubmit)}>
			<h1>Signup</h1>
			<div className="input-wrapper">
				<label htmlFor="file"></label>
				<input
					type="file"
					name="img"
					id="file"
					ref={register({ required: true })}
				/>
				<span className={`${errors.img ? "" : "hide"} error`}>
					{(errors.img && errors.img.message) || "Uplaod a File"}!
				</span>
				<input
					type="text"
					name="name"
					placeholder="Name"
					// ref={register({ required: true, min: 2 })}
				/>
				<span className={`${errors.name ? "" : "hide"}  error`}>
					{(errors.name && errors.name.message) || "Enter a name"}!
				</span>
				<input
					type="email"
					name="email"
					placeholder="Email"
					ref={register({
						required: true,
						pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
					})}
				/>
				<span className={`${errors.email ? "" : "hide"} error`}>
					{(errors.email && errors.email.message) || "Invalid Email"}!
				</span>
				<input
					type="password"
					name="password"
					placeholder="Password"
					ref={register({ required: true, min: 6 })}
				/>
				<span className={`${errors.password ? "" : "hide"}  error`}>
					{(errors.password && errors.password.message) || "Invalid Password"}!
				</span>
				<input
					type="password"
					name="confirmPassword"
					placeholder="Confirm Password"
					ref={register({
						required: true,
						min: 6,
						validate: (value) => value === watch("password"),
					})}
				/>
				<span className={`${errors.confirmPassword ? "" : "hide"}  error`}>
					{(errors.confirmPassword && errors.confirmPassword.message) ||
						"Invalid confirm password"}
					!
				</span>
				<Button loading={loading} text="Gooo!" />
			</div>
			<Link to="/auth/login">Login</Link>
		</form>
	);
};

export default Signup;
