import React from "react";
import { Route, Switch } from "react-router-dom";

import Auth from "./components/auth";

function App() {
	return <Route path="/auth" component={Auth} />;
}
export default App;
