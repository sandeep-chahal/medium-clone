import React, { useContext } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { signout } from "../../../axios-utils";
import { Context } from "../../../store/store";

const UserMenu = ({ user }) => {
	const [_, dispatch] = useContext(Context);
	const growDown = useSpring({
		from: {
			height: "0px",
		},
		height: "300px",
	});

	const handleSignout = () => {
		if (signout) {
			dispatch({ type: "SIGNOUT" });
		}
	};

	return (
		<animated.div style={growDown} className="user-menu-wrapper">
			<div className="notch"></div>
			<div className="menu">
				<div className="user">
					<img
						onError={(ev) =>
							(ev.target.src = require("../../../assets/img/user.png"))
						}
						src={`${user.img}-250px.jpeg`}
					/>
					<h4>{user.name}</h4>
				</div>
				<Link className="membership" to="membership">
					Become a member
				</Link>
				<div className="line" />
				<ul>
					<Link to="/newStory">New Story</Link>
					<Link to="/user/me">Stories</Link>
					<Link to="/interests">Customize your interests</Link>
					<div className="line" />
					<a href="https://help.medium.com/hc/en-us" target="_blank">
						Help
					</a>
					<div className="signout-btn" onClick={handleSignout}>
						Signout
					</div>
				</ul>
			</div>
		</animated.div>
	);
};

export default UserMenu;
