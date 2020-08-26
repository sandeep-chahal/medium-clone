import React, { useState, useEffect } from "react";
import "./style.scss";

import { fetchStories, bookmark } from "../../axios-utils";
import StoryItem from "./storyItem";
import Button from "../button/Button";
import Spinner from "../spinner";
import { Link } from "react-router-dom";
import { GetFormattedDate } from "../../utils";

const Home = ({ state, dispatch }) => {
	useEffect(() => {
		if (!state.stories.length)
			fetchStories(state.page, dispatch, !state.trendingStories.length);
	}, []);

	if (state.fetchingStories) return <Spinner color="#333" />;
	return (
		<div className="home">
			<div className="feed-stories">
				{Array.isArray(state.stories) ? (
					state.stories.map((story) => (
						<StoryItem story={story} key={story._id} bookmark={bookmark} />
					))
				) : (
					<div className="empty">
						<div>No Stories Found!</div>
						<Link to="/interests">Customize Your Interest</Link>
					</div>
				)}
				{state.more ? (
					<Button
						text="More"
						onClick={() => fetchStories(state.page, dispatch)}
					/>
				) : null}
			</div>
			<div className="sidebar">
				{Array.isArray(state.trendingStories) && (
					<div className="trending">
						<div className="header">Featured</div>
						{state.trendingStories.map(
							(story) =>
								story && (
									<Link
										to={`/story/${story._id}`}
										className="trending-story"
										key={story._id}
									>
										<h3>{story.title}</h3>
										<div className="summary">{story.summary}</div>
										<div className="date">
											{GetFormattedDate(story.createdAt)}
										</div>
									</Link>
								)
						)}
					</div>
				)}
				<div className="footer"></div>
			</div>
		</div>
	);
};

export default Home;
