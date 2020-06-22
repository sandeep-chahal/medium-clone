import React, { useState, Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

import Input from "./input";
import Button from "../button/Button";

const Login = () => {
	const [loading, setLoading] = useState(false);
	const [sent, setSent] = useState(false);
	const history = useHistory();
	const { register, handleSubmit, watch, errors, setError } = useForm();

	const onSubmit = (data) => {
		if (loading) return;
		setLoading(true);
		axios
			.post(`/api/v1/forgotPassword`, data)
			.then((res) => {
				if (res.data.result === "success") setSent(true);
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
		<Fragment>
			{!sent ? (
				<form className="form" onSubmit={handleSubmit(onSubmit)}>
					<h1>Forgot Password</h1>
					<div className="input-wrapper">
						<Input
							style={{ marginBottom: "10px" }}
							type="email"
							name="email"
							reg={register}
							error={errors.email}
						/>
						<span className="error">
							{errors.connection && errors.connection.message}
						</span>

						<Button loading={loading} text="Send Mail!" />
					</div>

					<Link to="/auth/login">Login</Link>
				</form>
			) : (
				<div className="email-sent">
					<h1>Email Sent!</h1>
					<p>Check your email and click on the reset button link!</p>
					<Link to="/auth/login">Login</Link>
				</div>
			)}
		</Fragment>
	);
};

export default Login;
