import React, { useEffect, useContext, useState, Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import axios from "axios";

import { Context } from "./store/store";
import Nav from "./components/nav";
import Auth from "./components/auth";
import Interests from "./components/interests";
import Home from "./components/home";
import Editor from "./components/editor";
import Story from "./components/story";
import Stories from "./components/stories";
import Bookmark from "./components/bookmark/bookmark";

import Spinner from "./components/spinner";

function App() {
	const [state, dispatch] = useContext(Context);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios
			.get("/api/v1/user")
			.then((res) => {
				dispatch({
					type: "SET_USER",
					payload: {
						...res.data.user,
					},
				});
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				setLoading(false);
			});
	}, []);

	if (loading) return <Spinner size="100px" color="black" />;
	return (
		<Fragment>
			<Nav user={state.user} />
			<Switch>
				<Route path="/auth" component={Auth} />
				{!state.user ? <Redirect to="/auth/login" /> : null}
				<Route exact path="/newstory" component={Editor} />
				<Route exact path="/">
					<Home state={state} dispatch={dispatch} />
				</Route>
				<Route exact path="/interests" component={Interests} />
				<Route exact path="/story/:id" component={Story} />
				<Route exact path="/user/:id" component={Stories} />
				<Route exact path="/bookmark" component={Bookmark} />
			</Switch>
		</Fragment>
	);
}
export default App;
