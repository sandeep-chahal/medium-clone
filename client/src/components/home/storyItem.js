import React from "react";
import { Link } from "react-router-dom";

const StoryItem = ({ story, bookmark }) => {
	return (
		<article>
			<div className="info">
				<Link to={`/story/${story._id}`}>
					<div className="desc">
						<span className="based-on">Based on your interset</span>
						<div className="title">{story.title}</div>
						<div className="summary">{story.summary}</div>
					</div>
				</Link>

				<div className="about">
					<div>
						<Link className="author" to={`/user/${story.author._id}`}>
							{story.author.name}
						</Link>
						<div className="date">{story.createdAt}</div>
					</div>
					<img
						onClick={() => bookmark(story._id)}
						className="icon"
						src={require("../../assets/img/bookmark.svg")}
					/>
				</div>
			</div>
			<Link to={`/story/${story._id}`}>
				<img className="img" src={`${story.img}-400px.jpeg`} />
			</Link>
		</article>
	);
};

export default StoryItem;