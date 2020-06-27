import axios from "axios";

export const fetchStories = (page, dispatch) => {
	axios
		.get(`/api/v1/stories?page=${page}`)
		.then((res) => {
			dispatch({
				type: "SET_STORIES",
				payload: {
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
