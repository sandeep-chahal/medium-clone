import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

import Input from "./input";
import Button from "../button/Button";

const Login = () => {
	const [loading, setLoading] = useState(false);
	const history = useHistory();
	const { register, handleSubmit, watch, errors, setError } = useForm();

	// login
	const onSubmit = (data) => {
		if (loading) return;
		setLoading(true);
		axios
			.post(`/api/v1/login`, data)
			.then((res) => {
				if (res.data.result === "success") history.push("/");
			})
			.catch((err) => {
				// get errors
				const errors = err.response.data && err.response.data.errors;
				// if server responded with errors
				if (errors)
					errors.map((error) => setError(error.param, null, error.msg));
				// if not
				else setError("connection", null, "Something Went Wrong!");
				setLoading(false);
			});
	};

	return (
		<form className="form" onSubmit={handleSubmit(onSubmit)}>
			<h1>Login</h1>
			<div className="input-wrapper">
				<Input
					style={{ marginBottom: "10px" }}
					type="email"
					name="email"
					reg={register}
				/>
				<Input type="password" name="password" reg={register} />
				<span className="error">
					{errors.connection && errors.connection.message}
					{errors.password || errors.email ? "Invalid Credential" : null}&nbsp;
				</span>

				<Button loading={loading} text="Gooo!" />
			</div>
			<Link to="/auth/signup">Signup</Link>
			<Link to="/auth/forgotPassword">Forgot Password</Link>
		</form>
	);
};

export default Login;
