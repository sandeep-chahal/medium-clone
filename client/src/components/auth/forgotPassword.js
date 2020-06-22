import React, { useState, Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import submit from "./submit";
import Input from "./input";
import Button from "../button/Button";

const Login = () => {
	const [loading, setLoading] = useState(false);
	const [sent, setSent] = useState(false);
	const history = useHistory();
	const { register, handleSubmit, watch, errors, setError } = useForm();

	const onSubmit = (data) => {
		if (loading) return;
		submit({
			data,
			endpoint: "forgotPassword",
			setError,
			setLoading,
			success: () => setSent(true),
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
