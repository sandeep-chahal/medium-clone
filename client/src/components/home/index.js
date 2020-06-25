import React, { useState, useEffect } from "react";
import "./style.scss";
import { useHistory } from "react-router-dom";

import { fetchStories, bookmark } from "../../axios-utils";
import StoryItem from "./storyItem";
import Button from "../button/Button";
import Spinner from "../spinner";

const Home = ({ state, dispatch }) => {
	useEffect(() => {
		fetchStories(state.page, dispatch);
	}, []);

	if (state.fetchingStories) return <Spinner color="#333" />;
	return (
		<div className="home">
			<div className="feed-stories">
				{Array.isArray(state.stories) &&
					state.stories.map((story) => (
						<StoryItem story={story} key={story._id} bookmark={bookmark} />
					))}
				{state.more ? (
					<Button
						text="More"
						onClick={() => fetchStories(state.page, dispatch)}
					/>
				) : null}
			</div>
			<div className="sidebar">
				<div className="trending"></div>
				<div className="footer"></div>
			</div>
		</div>
	);
};

export default Home;
