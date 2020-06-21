import React, { useState } from "react";
import { Link } from "react-router-dom";

import Button from "../button/Button";

const Login = () => {
	const [loading, setLoading] = useState(false);
	return (
		<div className="form">
			<h1>Login</h1>
			<div className="input-wrapper">
				<input type="email" placeholder="Email" />
				<input type="password" placeholder="Password" />
				<Button
					loading={loading}
					text="Gooo!"
					onClick={() => setLoading(!loading)}
				/>
			</div>
			<Link to="/auth/signup">Signup</Link>
		</div>
	);
};

export default Login;
