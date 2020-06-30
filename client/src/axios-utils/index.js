import axios from "axios";

export const fetchStories = (page, dispatch, getTrending) => {
	axios
		.get(`/api/v1/stories?page=${page}&getTrending=${getTrending}`)
		.then((res) => {
			dispatch({
				type: "SET_STORIES",
				payload: {
					trendingStories: res.data.data.trendingStories,
					stories: res.data.data.stories,
					page: ++page,
					fetchingStories: false,
					more: res.data.data.length ? true : false,
				},
			});
		})
		.catch((err) => {
			console.log(err);
		});
};
export const bookmark = (storyId) => {
	return axios.post(`/api/v1/bookmark`, { id: storyId }).then((res) => {
		return true;
	});
};
export const unbookmark = (storyId) => {
	return axios.post(`/api/v1/removeBookmark`, { id: storyId }).then((res) => {
		return true;
	});
};
export const fetchStory = (storyId, setStory, errorHandler) => {
	axios
		.get(`/api/v1/story?id=${storyId}`)
		.then((res) => {
			console.log(res.data);
			setStory(res.data.data.story);
		})
		.catch((err) => {
			errorHandler();
		});
};
export const follow = (id) => {
	return axios
		.post(`/api/v1/follow`, { id })
		.then((res) => {
			return true;
		})
		.catch((err) => {
			return false;
			console.log(err);
		});
};
export const unfollow = (id) => {
	return axios
		.post(`/api/v1/unfollow`, { id })
		.then((res) => {
			return true;
		})
		.catch((err) => {
			return false;
			console.log(err);
		});
};
export const clap = (id) => {
	return axios
		.post(`/api/v1/clap`, { id })
		.then((res) => {
			return true;
		})
		.catch((err) => {
			return false;
			console.log(err);
		});
};

export const signout = () => {
	return axios
		.get("/api/v1/signout")
		.then((res) => (res.result === "success" ? true : false));
};

export const getUserStories = (id, page) => {
	return axios
		.get(`/api/v1/getUserStories?id=${id}&page=${page}`)
		.then((res) => {
			return [res.data.data.stories, res.data.data.user];
		})
		.catch((err) => {
			console.log(err.message);
			return false;
		});
};

export const fetchBookmarkStories = () => {
	return axios
		.get(`/api/v1/getBookmark`)
		.then((res) => {
			return res.data.data.stories;
		})
		.catch((err) => {
			console.log(err.message);
			return false;
		});
};
