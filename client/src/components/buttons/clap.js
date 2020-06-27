import React from "react";
import "./style.scss";
import { clap } from "../../axios-utils";
import { ReactComponent as ClapSvg } from "../../assets/img/hand.svg";

const ClapBtn = ({ id }) => {
	const handleClap = () => {
		clap(id);
	};
	return (
		<div className={`clap-btn`} onClick={handleClap}>
			<ClapSvg />
		</div>
	);
};

export default ClapBtn;
