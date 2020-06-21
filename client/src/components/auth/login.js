import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

import Button from "../button/Button";

const Login = () => {
	const [loading, setLoading] = useState(false);
	const [authError, setAuthError] = useState("");
	const history = useHistory();
	const { register, handleSubmit, watch, errors } = useForm();

	// login
	const onSubmit = (data) => {
		if (loading) return;
		setAuthError("");
		setLoading(true);
		axios
			.post(`/api/v1/login`, data)
			.then((res) => {
				if (res.data.result === "success") history.push("/");
			})
			.catch((err) => {
				if (err.response && err.response.status >= 400)
					setAuthError("Invalid Credential");
				setLoading(false);
			});
	};

	return (
		<form className="form" onSubmit={handleSubmit(onSubmit)}>
			<h1>Login</h1>
			<div className="input-wrapper">
				<input
					style={{ marginBottom: "10px" }}
					type="email"
					placeholder="Email"
					name="email"
					ref={register({
						pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
					})}
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					ref={register({ required: true, minLength: 6 })}
				/>
				<span
					className={`${
						errors.password || errors.email || authError ? "" : "hide"
					} error`}
				>
					Invalid Credential!
				</span>

				<Button loading={loading} text="Gooo!" />
			</div>
			<Link to="/auth/signup">Signup</Link>
		</form>
	);
};

export default Login;
