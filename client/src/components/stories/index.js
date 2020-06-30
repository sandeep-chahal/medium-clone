import React, { useEffect, useState, useContext } from "react";
import "./style.scss";
import { Link, useLocation, useHistory } from "react-router-dom";
import { getUserStories } from "../../axios-utils";
import { Context } from "../../store/store";
import FollowBtn from "../buttons/follow";
import Spinner from "../spinner";

const Stories = () => {
	const [stories, setStries] = useState([]);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);
	const [state, _] = useContext(Context);
	const location = useLocation();
	const history = useHistory();

	// get user id from url
	let id = location.pathname.replace("/user/", "");
	id = id === "me" ? state.user._id : id;

	// fetch stories of user
	const fetchStories = async () => {
		const [stories, user] = await getUserStories(id);
		if (stories) {
			setStries([...stories, stories]);
			setUser(user);
			setLoading(false);
		} else {
			history.push("/");
		}
	};

	useEffect(() => {
		setLoading(true);
		fetchStories();
	}, [id]);

	if (loading) return <Spinner color="black" />;

	return (
		<div className="stories">
			{user && user._id !== state.user._id ? (
				<div className="user-header">
					<img src={`${user.img}-80px.jpeg`} />
					<div className="user">
						<h2 className="name">{user.name}</h2>
						<FollowBtn id={user._id} isF={user.isFollowing} />
					</div>
				</div>
			) : (
				<div className="header">
					<h1>Your Stories</h1>
					<Link to="createStory">Write Story</Link>
				</div>
			)}
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
							<p className="date">{story.createdAt}</p>
						</Link>
					))}
			</div>
		</div>
	);
};

export default Stories;
