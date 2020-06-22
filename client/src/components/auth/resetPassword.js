import React, { useState, Fragment } from "react";
import { Link, useHistory, useLocation, Redirect } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

import Input from "./input";
import Button from "../button/Button";

const ResetPassword = () => {
	const [loading, setLoading] = useState(false);
	const history = useHistory();
	const location = useLocation();
	const { register, handleSubmit, watch, errors, setError } = useForm();

	// get email and token from url
	const paramData = {};
	location.search
		.replace("?", "")
		.split("&")
		.map((param) => (paramData[param.split("=")[0]] = param.split("=")[1]));
	console.log(paramData);

	const onSubmit = (data) => {
		if (loading) return;
		setLoading(true);
		axios
			.post(`/api/v1/resetPassword`, { ...data, ...paramData })
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

	return !paramData || !paramData.email || !paramData.token ? (
		<Redirect to="/auth/login" />
	) : (
		<form className="form" onSubmit={handleSubmit(onSubmit)}>
			<h1>Reset Password</h1>
			<div className="input-wrapper">
				<Input
					name="password"
					type="password"
					reg={register}
					error={errors.password}
				/>
				<Input
					name="confirm Password"
					type="password"
					reg={register}
					error={errors.confirmpassword}
					watch={watch}
				/>

				{/* connection error */}
				<span className="error">
					{errors.connection && errors.connection.message}&nbsp;
				</span>

				<Button loading={loading} text="Reset!" />
			</div>

			<Link to="/auth/login">Login</Link>
		</form>
	);
};

export default ResetPassword;
