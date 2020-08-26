import React, { useState, useEffect } from "react";
import "./style.scss";
import { useHistory, Link } from "react-router-dom";
import MediumEditor from "react-medium-editor";

import { fetchStory } from "../../axios-utils";
import Spinner from "../spinner";
import BookmarkBtn from "../buttons/bookmark";
import FollowBtn from "../buttons/follow";
import ClapBtn from "../buttons/clap";
import { GetFormattedDate } from "../../utils";

const Story = (props) => {
	const [story, setStory] = useState(null);
	const history = useHistory();

	useEffect(() => {
		fetchStory(props.match.params.id, setStory, () => history.push("/"));
	}, []);

	if (!story) return <Spinner color="black" />;
	return (
		<div className="story">
			<div className="header">
				<h1>{story.title}</h1>
				<div className="about">
					<div className="author">
						<img
							onError={(ev) =>
								(ev.target.src = require("../../assets/img/user.png"))
							}
							className="author-img"
							src={`${story.author.img}-60px.jpeg`}
						/>
						<div className="meta">
							<Link to={`/user/${story.author._id}`} className="name">
								{story.author.name}
							</Link>
							<div className="date">{GetFormattedDate(story.createdAt)}</div>
						</div>
					</div>
					<BookmarkBtn isBM={story.bookmarked} id={story._id} />
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
				<ClapBtn id={story._id} />
				<div className="count">{story.claps.length} claps</div>
			</div>
			<div className="line"></div>
			<div className="footer-author">
				<img
					onError={(ev) =>
						(ev.target.src = require("../../assets/img/user.png"))
					}
					src={`${story.author.img}-250px.jpeg`}
				/>
				<div className="author">
					<div className="written-by">Written by</div>
					<Link to={`/user/${story.author._id}`} className="name">
						{story.author.name}
					</Link>
				</div>
				<FollowBtn id={story.author._id} isF={story.following} />
			</div>
			<div className="line"></div>
		</div>
	);
};
export default Story;
