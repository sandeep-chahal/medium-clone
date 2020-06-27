import React, { useState } from "react";
import "./style.scss";
import { ReactComponent as BookmarkLogo } from "../../assets/img/bookmark.svg";
import { bookmark as bookmarkStory } from "../../axios-utils";

const Bookmark = ({ id, isBM }) => {
	const [bookmarked, setBookmarked] = useState(isBM || false);

	const bookmark = () => {
		if (bookmarkStory(id)) setBookmarked(true);
	};
	return (
		<div className={`bookmark-logo`} onClick={bookmark}>
			<BookmarkLogo className={`${bookmarked ? "bookmarked" : ""}`} />
		</div>
	);
};

export default Bookmark;
