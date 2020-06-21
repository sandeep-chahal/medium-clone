import React, { useState } from "react";
import { Link } from "react-router-dom";

import Button from "../button/Button";

const Signup = () => {
	const [loading, setLoading] = useState(false);

	return (
		<div className="form">
			<h1>Signup</h1>
			<div className="input-wrapper">
				<label htmlFor="file"></label>
				<input type="file" id="file" />
				<input type="text" placeholder="Name" />
				<input type="email" placeholder="Email" />
				<input type="password" placeholder="Password" />
				<input type="password" placeholder="Confirm Password" />
				<Button
					loading={loading}
					text="Gooo!"
					onClick={() => setLoading(!loading)}
				/>
			</div>
			<Link to="/auth/login">Login</Link>
		</div>
	);
};

export default Signup;
