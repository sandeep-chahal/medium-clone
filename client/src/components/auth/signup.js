import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

import Input from "./input";
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
				const errors = err.response.data && err.response.data.errors;
				if (errors)
					err.response.data.errors.map((error) => {
						setError(error.param, null, error.msg);
					});
				else setError("connection", null, "Something Went Wrong!");
				setLoading(false);
			});
	};

	return (
		<form className="form" onSubmit={handleSubmit(onSubmit)}>
			<h1>Signup</h1>
			<div className="input-wrapper">
				<label htmlFor="file"></label>
				<Input name="img" type="file" reg={register} error={errors.img} />
				<Input name="name" reg={register} error={errors.name} />
				<Input name="email" reg={register} error={errors.email} />
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
				<span className={`error`}>
					{errors.connection && errors.connection.message}&nbsp;
				</span>
				<Button loading={loading} text="Signup!" />
			</div>
			<Link to="/auth/login">Login</Link>
		</form>
	);
};

export default Signup;
