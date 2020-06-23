import React, { useState } from "react";
import { Link, useHistory, useLocation, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";

import submit from "./submit";
import Input from "./input";
import Button from "../button/Button";

const ResetPassword = ({ setUser }) => {
	const [loading, setLoading] = useState(false);
	const history = useHistory();
	const location = useLocation();
	const { register, handleSubmit, watch, errors, setError } = useForm();

	// get email and token from url
	const queryData = {};
	location.search
		.replace("?", "")
		.split("&")
		.map((query) => (queryData[query.split("=")[0]] = query.split("=")[1]));

	const onSubmit = (data) => {
		if (loading) return;

		submit({
			endpoint: "resetPassword",
			data: { ...data, ...queryData },
			setLoading,
			setError,
			success: setUser,
		});
	};

	return !queryData || !queryData.email || !queryData.token ? (
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
					error={errors.confirmPassword}
					watch={watch}
				/>

				{/* connection error */}
				<span className="error">
					{errors.connection && errors.connection.message}&nbsp;
					{errors.token && errors.token.message}&nbsp;
				</span>

				<Button loading={loading} text="Reset!" />
			</div>

			<Link to="/auth/login">Login</Link>
		</form>
	);
};

export default ResetPassword;
