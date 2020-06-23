import React from "react";
import "./style.scss";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";

const Nav = ({ user }) => {
	const slideLeft = useSpring({
		from: {
			position: "absolute",
			left: "50%",
			transform: "translateX(-50%)",
			opacity: 0,
		},
		left: user ? "10rem" : "50%",
		opacity: 1,
	});
	const slideUp = useSpring({
		from: {
			opacity: 0,
		},
		opacity: 1,
	});

	return (
		<nav>
			<animated.h3 style={slideLeft}>Medium</animated.h3>
			{user ? (
				<animated.div style={slideUp} className="menu-items">
					<Link to="/bookmark">
						<img src={require("../../assets/img/bookmark.svg")} />
					</Link>
					<Link className="upgrade-btn" to="/upgrade">
						Upgrade
					</Link>
					<div className="user-img">
						<img src={`${user.img}-60px.jpeg`} />
					</div>
				</animated.div>
			) : null}
		</nav>
	);
};

export default Nav;
