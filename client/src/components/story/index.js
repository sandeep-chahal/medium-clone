import React, { useState, useEffect } from "react";
import "./style.scss";
import { useHistory } from "react-router-dom";
import MediumEditor from "react-medium-editor";

import { fetchStory, bookmark, follow } from "../../axios-utils";
import Spinner from "../spinner";
import StoryItem from "./storyItem";

const Story = (props) => {
	const [story, setStory] = useState(null);
	const history = useHistory();
	useEffect(() => {
		fetchStory(props.match.params.id, setStory, () => history.push("/"));
	}, []);

	const handleFollow = () => {
		follow(story.author._id);
	};

	if (!story) return <Spinner color="black" />;
	return (
		<div className="story">
			<div className="header">
				<h1>{story.title}</h1>
				<div className="about">
					<div className="author">
						<img className="author-img" src={`${story.author.img}-80px.jpeg`} />
						<div className="meta">
							<div className="name">{story.author.name}</div>
							<div className="date">{story.createdAt}</div>
						</div>
					</div>
					<img
						onClick={() => bookmark(story._id)}
						className="icon"
						src={require("../../assets/img/bookmark.svg")}
					/>
				</div>
			</div>
			<div className="markdown">
				<MediumEditor
					text={story.body}
					options={{
						toolbar: false,
						contentEditable: false,
						disableEditing: true,
					}}
				/>
			</div>

			<div className="line"></div>
			<div className="tags">
				{story.tags.map((tag) => (
					<div key={tag} className={"tag"}>
						{tag}
					</div>
				))}
			</div>
			<div className="claps">
				<img />
				<div className="count">{story.claps.length} claps</div>
			</div>
			<div className="line"></div>
			<div className="footer-author">
				<img src={`{story.author.img}-450px.jpeg`} />
				<div className="author">
					<div className="written-by">Written by</div>
					<div className="name">{story.author.name}</div>
				</div>
				<div className="follow-btn" onClick={handleFollow}>
					Follow
				</div>
			</div>
			<div className="line"></div>
		</div>
	);
};
export default Story;
