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
	axios.post(`/api/v1/bookmark`, { id: storyId });
};
