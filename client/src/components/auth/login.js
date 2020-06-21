import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import Button from "../button/Button";

const Login = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		name === "email" ? setEmail(value) : setPassword(value);
	};

	const login = () => {
		if (loading) return;
		setError("");
		setLoading(true);
		axios
			.post(`/api/v1/login`, {
				email,
				password,
			})
			.then((res) => {
				if (res.data.result === "success") history.push("/");
			})
			.catch((err) => {
				if (err.response && err.response.status >= 400)
					setError("Invalid Credential");
				setLoading(false);
			});
	};

	return (
		<div className="form">
			<h1>Login</h1>
			<div className="input-wrapper">
				<input
					style={{ marginBottom: "10px" }}
					type="email"
					placeholder="Email"
					value={email}
					name="email"
					onChange={handleChange}
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					value={password}
					onChange={handleChange}
				/>
				<span className={`${error ? "" : "hide"} error`}>{error}!</span>
				<Button loading={loading} text="Gooo!" onClick={login} />
			</div>
			<Link to="/auth/signup">Signup</Link>
		</div>
	);
};

export default Login;
