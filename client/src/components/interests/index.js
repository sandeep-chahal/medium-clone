import React, { useState } from "react";
import "./style.scss";
import { useHistory } from "react-router-dom";

import Item from "./item";
import Button from "../button/Button";
import axios from "axios";

const __interests = [
	"javascript",
	"web dev",
	"machine learning",
	"AI",
	"tech",
	"startup",
	"java",
	"golang",
	"UI",
	"UX",
	"design",
	"business",
	"typescript",
	"react",
	"node",
	"frontend",
	"backend",
	"python",
	"pandas",
	"data science",
];

const Interests = () => {
	const [interests, setInterests] = useState({});

	const history = useHistory();

	const select = (interest) => {
		if (interests[interest]) {
			const _temp = { ...interests };
			delete _temp[interest];
			setInterests(_temp);
		} else setInterests((prev) => ({ ...prev, [interest]: true }));
	};

	const save = () => {
		axios
			.post("/api/v1/customizeInterests", {
				interests: Object.keys(interests),
			})
			.then((res) => {
				console.log(res);
				if (res.data && res.data.result === "success") {
					window.location.replace("/");
				}
			})
			.catch((err) => {
				console.log(err, err.response);
			});
	};

	return (
		<div className="interests">
			<h1>Choose topics that you are interested in.</h1>
			<div className="items">
				{__interests.map((interest) => (
					<Item
						key={interest}
						text={interest}
						select={select}
						selected={interests[interest]}
					/>
				))}
			</div>
			<Button text="save" onClick={save} />
		</div>
	);
};

export default Interests;
