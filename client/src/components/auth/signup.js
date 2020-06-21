import React, { useState } from "react";
import { Link } from "react-router-dom";

import Button from "../button/Button";

const Signup = () => {
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState([]);

	return (
		<div className="form">
			<h1>Signup</h1>
			<div className="input-wrapper">
				<label htmlFor="file"></label>
				<input type="file" id="file" />
				<span className={`${errors.length ? "" : "hide"} " error"`}>
					{errors.filter((error) => error.param === "img")}
				</span>
				<input type="text" placeholder="Name" />
				<span className={`${errors.length ? "" : "hide"} " error"`}>
					{errors.filter((error) => error.param === "name")}!
				</span>
				<input type="email" placeholder="Email" />
				<span className={`${errors.length ? "" : "hide"} " error"`}>
					Invalid Password
				</span>
				<input type="password" placeholder="Password" />
				<span className={`${errors.length ? "" : "hide"} " error"`}>
					Invalid Password
				</span>
				<input type="password" placeholder="Confirm Password" />
				<span className={`${errors.length ? "" : "hide"} " error"`}>
					Invalid Password
				</span>
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
