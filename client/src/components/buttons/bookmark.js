import React, { useState } from "react";
import "./style.scss";
import { ReactComponent as BookmarkLogo } from "../../assets/img/bookmark.svg";
import {
	bookmark as bookmarkStory,
	unbookmark as unbookmarkStory,
} from "../../axios-utils";

const Bookmark = ({ id, isBM }) => {
	const [bookmarked, setBookmarked] = useState(isBM || false);

	const bookmark = () => {
		if (!bookmarked) bookmarkStory(id) && setBookmarked(true);
		else unbookmarkStory(id) && setBookmarked(false);
	};
	return (
		<div className={`bookmark-logo`} onClick={bookmark}>
			<BookmarkLogo className={`${bookmarked ? "bookmarked" : ""}`} />
		</div>
	);
};

export default Bookmark;
