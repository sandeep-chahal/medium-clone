import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import submit from "./submit";
import Input from "./input";
import Button from "../button/Button";

const Login = ({ setUser }) => {
	const [loading, setLoading] = useState(false);
	const history = useHistory();
	const { register, handleSubmit, watch, errors, setError } = useForm();

	// login
	const onSubmit = (data) => {
		if (loading) return;
		submit({
			data,
			endpoint: "login",
			success: setUser,
			setError,
			setLoading,
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
					{errors.password || errors.email || errors.auth
						? "Invalid Credential"
						: null}
					&nbsp;
				</span>

				<Button loading={loading} text="Gooo!" />
			</div>
			<Link to="/auth/signup">Signup</Link>
			<Link to="/auth/forgotPassword">Forgot Password</Link>
		</form>
	);
};

export default Login;
