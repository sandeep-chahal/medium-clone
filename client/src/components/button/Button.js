import React from "react";
import "./button.scss";
import { useTransition, animated } from "react-spring";

const Button = (props) => {
	const transitions = useTransition(props, (props) => props.loading, {
		from: { position: "absolute", transform: "translateY(-30px)" },
		enter: { transform: "translateY(0)" },
		leave: { transform: "translateY(30px)" },
	});
	return (
		<button
			type="submit"
			style={{
				cursor: props.loading ? "not-allowed" : "pointer",
			}}
			className="button-animated"
			onClick={props.onClick}
		>
			{transitions.map(({ item, key, props }) =>
				item.loading ? (
					<animated.div className="text" style={props} key={key}>
						Hold on...
					</animated.div>
				) : (
					<animated.div className="text" style={props} key={key}>
						{item.text || "Goo!"}
					</animated.div>
				)
			)}
		</button>
	);
};

export default Button;
