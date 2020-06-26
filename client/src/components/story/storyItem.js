import React from "react";

export default function storyItem({ story }) {
	return (
		<div className="small-story">
			<img src={`${story.img}.jpeg`} />
			<h3>{story.title}</h3>
			<div className="about">
				<img src={`${story.author.img}`} />
				<div className="auhor">
					<div>{story.author.name}</div>
					<div className="date">{story.createdAt}</div>
				</div>
			</div>
		</div>
	);
}
