import React from "react";
import "./button.scss";
import { useTransition, animated } from "react-spring";

const Button = (props) => {
	const transitions = useTransition(props.loading, null, {
		from: { position: "absolute", transform: "translateY(-30px)" },
		enter: { transform: "translateY(0)" },
		leave: { transform: "translateY(30px)" },
	});

	return (
		<div className="button-animated" onClick={props.onClick}>
			{transitions.map(({ item, key, props }) =>
				item ? (
					<animated.div className="text" style={props} key={key}>
						Hold on...
					</animated.div>
				) : (
					<animated.div className="text" style={props} key={key}>
						Gooo!
					</animated.div>
				)
			)}
		</div>
	);
};

export default Button;
