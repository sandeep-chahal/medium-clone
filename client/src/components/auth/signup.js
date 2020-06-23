import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import submit from "./submit";
import Input from "./input";
import Button from "../button/Button";

const Signup = ({ setUser }) => {
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const { register, handleSubmit, watch, errors, setError } = useForm();
	const onSubmit = (data) => {
		if (loading) return;
		submit({
			data,
			endpoint: "signup",
			success: setUser,
			setError,
			setLoading,
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
					error={errors.confirmPassword}
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
