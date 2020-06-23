import React from "react";
import "./style.css";

const Spinner = ({ size, color }) => (
	<div
		className="loader"
		style={{
			width: size,
			height: size,
			borderColor: `${color} transparent transparent`,
		}}
	></div>
);

export default Spinner;
