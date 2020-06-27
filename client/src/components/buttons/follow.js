import React, { useState } from "react";
import "./style.scss";
import { follow, unfollow } from "../../axios-utils";

const FollowBtn = ({ id, isF }) => {
	const [following, setFollowing] = useState(isF || false);

	const handleFollow = () => {
		if (following) {
			unfollow(id) && setFollowing(false);
		} else {
			follow(id) && setFollowing(true);
		}
	};
	return (
		<div className={`follow-btn`} onClick={handleFollow}>
			{following ? "Following" : "Follow"}
		</div>
	);
};

export default FollowBtn;
