import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Auth from "./components/auth";
import Interests from "./components/interests";

function App() {
	return (
		<Switch>
			<Route path="/auth" component={Auth} />
			<Route path="/interests" component={Interests} />
			<Redirect to="/interests" />
		</Switch>
	);
}
export default App;
