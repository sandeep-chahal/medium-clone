import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

import Button from "../button/Button";

const Login = () => {
	const [loading, setLoading] = useState(false);
	const [sent, setSent] = useState(false);
	const history = useHistory();
	const { register, handleSubmit, watch, errors, setError } = useForm();

	// login
	const onSubmit = (data) => {
		if (loading) return;
		setLoading(true);
		axios
			.post(`/api/v1/forgotPassword`, data)
			.then((res) => {
				if (res.data.result === "success") setSent(true);
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
			<h1>Forgot Password</h1>

			<div className="input-wrapper">
				<input
					style={{ marginBottom: "10px" }}
					type="email"
					placeholder="Email"
					name="email"
					ref={register({
						required: true,
						pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
					})}
				/>
				<span className={`${errors.email ? "" : "hide"} error`}>
					{(errors.email && errors.email.message) || "Enter Your Email!"}
				</span>

				<Button loading={loading} text="Send Mail!" />
			</div>

			<Link to="/auth/login">Login</Link>
		</form>
	);
};

export default Login;
