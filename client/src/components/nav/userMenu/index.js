import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";

const UserMenu = ({ user }) => {
	const growDown = useSpring({
		from: {
			height: "0px",
		},
		height: "300px",
	});

	return (
		<animated.div style={growDown} className="user-menu-wrapper">
			<div className="notch"></div>
			<div className="menu">
				<div className="user">
					<img src={`${user.img}-250px.jpeg`} />
					<h4>{user.name}</h4>
				</div>
				<Link className="membership" to="membership">
					Become a member
				</Link>
				<div className="line" />
				<ul>
					<Link to="/newStory">New Story</Link>
					<Link to="/stories">Stories</Link>
					<Link to="/interests">Customize your interests</Link>
					<div className="line" />
					<Link to="/profile">Profile</Link>
					<Link to="/signout">Signout</Link>
				</ul>
			</div>
		</animated.div>
	);
};

export default UserMenu;
