const Reducer = (state, action) => {
	switch (action.type) {
		case "SET_STORIES":
			console.log("got here");
			console.log(action.payload.stories);
			return {
				...state,
				stories: [...state.stories, ...action.payload.stories],
				trendingStories: [
					...state.trendingStories,
					...action.payload.trendingStories,
				],
				page: action.payload.page,
				more: action.payload.more,
				fetchingStories: false,
			};
		case "SET_USER":
			return {
				...state,
				user: action.payload,
			};
		case "SET_LOADING":
			return {
				...state,
				loading: action.payload,
			};
		case "SET_ERROR":
			return {
				...state,
				error: action.payload,
			};
		case "SIGNOUT":
			return {
				stories: [],
				page: 1,
				loading: false,
				user: null,
				error: null,
			};
		default:
			return state;
	}
};

export default Reducer;
