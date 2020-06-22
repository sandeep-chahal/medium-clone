import React from "react";

const Item = ({ text, selected, select }) => {
	return (
		<div
			onClick={() => select(text.toLowerCase())}
			className={`${selected ? "selected" : ""} item`}
		>
			{text}
		</div>
	);
};

export default Item;
