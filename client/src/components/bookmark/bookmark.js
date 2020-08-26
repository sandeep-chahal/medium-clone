import React, { useEffect, useState, useContext } from "react";
import "./style.scss";
import { Link, useHistory } from "react-router-dom";
import { fetchBookmarkStories } from "../../axios-utils";
import { Context } from "../../store/store";
import Spinner from "../spinner";

import { GetFormattedDate } from "../../utils";

const Bookmark = () => {
	const [stories, setStories] = useState([]);
	const [loading, setLoading] = useState(false);
	const [state, _] = useContext(Context);
	const history = useHistory();

	// fetch stories of user
	const getBookmarkStories = async () => {
		const stories = await fetchBookmarkStories();
		if (stories) {
			setStories(stories);
			setLoading(false);
		} else {
			history.push("/");
		}
	};

	useEffect(() => {
		setLoading(true);
		getBookmarkStories();
	}, []);

	if (loading) return <Spinner color="black" />;

	return (
		<div className="stories">
			<div className="header">
				<h1>Bookmarked</h1>
			</div>
			<div className="list">
				{Array.isArray(stories) &&
					stories.map((story) => (
						<Link
							to={`/story/${story._id}`}
							key={story._id}
							className="story-item"
						>
							<h2>{story.title}</h2>
							<p className="summary">{story.summary}</p>
							<p className="date">{GetFormattedDate(story.createdAt)}</p>
						</Link>
					))}
			</div>
		</div>
	);
};

export default Bookmark;
