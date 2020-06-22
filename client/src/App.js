import React, { useEffect, useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { Context } from "./store/store";
import Auth from "./components/auth";
import Interests from "./components/interests";
import Home from "./components/home";
import axios from "axios";

function App() {
	const [state, dispatch] = useContext(Context);

	useEffect(() => {
		axios
			.get("/api/v1/user")
			.then((res) => {
				dispatch({ type: "SET_USER", payload: res.data.user });
			})
			.catch((err) => console.log(err));
	}, []);

	if (!state.user) return <div>Loading...</div>;
	return (
		<Switch>
			<Route exact to="/" component={Home} />
			<Route path="/auth" component={Auth} />
			<Route path="/interests" component={Interests} />
		</Switch>
	);
}
export default App;
