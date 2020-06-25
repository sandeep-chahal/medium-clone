import React, { useState, useRef } from "react";
import "./style.scss";
import MediumEditor from "react-medium-editor";
import "medium-editor/dist/css/medium-editor.css";
import "medium-editor/dist/css/themes/default.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Button from "../button/Button";

const Editor = () => {
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({});
	const [img, setImg] = useState("");
	const title = useRef("");
	const summary = useRef("");
	const body = useRef("");
	const tags = useRef("");

	const validation = () => {
		const errors = {};
		if (!img) errors.img = "Please uplaod an image!";
		else delete errors.img;
		if (!title.current) errors.title = "Enter title!";
		else delete errors.title;
		if (!summary.current) errors.summary = "Story must have summary!";
		else delete errors.summary;
		if (!body.current) errors.body = "Write body of story!";
		else delete errors.body;
		if (!tags.current.split(",") > 0) errors.tags = "Story must have tags!";
		else delete errors.tags;

		setErrors(errors);
		return !Object.keys(errors).length;
	};

	const submit = () => {
		if (!loading && !validation()) return;
		setLoading(true);
		const formData = new FormData();
		formData.append("title", title.current);
		formData.append("summary", summary.current);
		formData.append("img", img);
		formData.append("tags", tags.current);
		formData.append("body", body.current);
		axios
			.post("/api/v1/createStory", formData, {
				"content-type": "multipart/form-data",
			})
			.then((res) => {
				if (res.data.result === "success")
					history.push(`/story/${res.data.story._id}`);
			})
			.catch((err) => {
				// get errors
				const errors =
					err.response && err.response.data && err.response.data.errors;
				//set Errors
				setErrors(
					Array.isArray(errors)
						? errors.reduce((acc, err) => {
								acc[err.param] = err.msg;
								return acc;
						  }, {})
						: { connection: "Something went worng" }
				);
			});
	};

	return (
		<div className="editor">
			<div className="overview">
				<label
					style={{
						backgroundImage: img ? `url(${URL.createObjectURL(img)})` : "",
					}}
					className="img-wrapper"
				>
					{errors.img || img ? null : "Choose a image"}
					<span className="error">{!img && errors.img}&nbsp;</span>
					<input
						type="file"
						name="img"
						onChange={(e) => {
							setImg(e.target.files[0]);
						}}
					/>
				</label>

				<div className="about">
					<input
						type="text"
						name="title"
						placeholder="Title"
						onChange={(e) => (title.current = e.target.value)}
					/>
					<span className="error">{errors.title}&nbsp;</span>
					<textarea
						name="summary"
						placeholder="Little Summary"
						onChange={(e) => (summary.current = e.target.value)}
					/>
					<span className="error">{errors.summary}&nbsp;</span>
				</div>
			</div>
			<MediumEditor
				tag="pre"
				text={body.current}
				onChange={(value) => (body.current = value)}
			/>
			<span className="error">{errors.body}&nbsp;</span>
			<input
				type="text"
				name="tags"
				placeholder="javascript, ml, data science"
				onChange={(e) => (tags.current = e.target.value)}
			/>
			<span className="error">{errors.title}&nbsp;</span>
			<span className="error">{errors.connection}&nbsp;</span>
			<Button text="Publish" onClick={submit} />
		</div>
	);
};

export default Editor;
