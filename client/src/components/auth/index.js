import React, { useContext } from "react";
import "./auth.scss";
import {
	Route,
	Switch,
	Redirect,
	useLocation,
	useHistory,
} from "react-router-dom";
import { useTransition, animated, useSpring } from "react-spring";

import { Context } from "../../store/store";
import Signup from "./signup";
import Login from "./login";
import ForgotPassword from "./forgotPassword";
import ResetPassword from "./resetPassword";

const Auth = () => {
	const [state, dispatch] = useContext(Context);
	const location = useLocation();
	const history = useHistory();
	const fadeIn = useSpring({
		opacity: 1,
		transform: "translateX(0)",
		from: { opacity: 0, transform: "translateX(-20%)" },
	});
	const fadeUp = useSpring({
		opacity: 1,
		transform: "translateY(0)",
		from: { opacity: 0, transform: "translateY(50%)" },
	});
	// for login and signup forms
	const transitions = useTransition(location, (location) => location.pathname, {
		from: { position: "absolute", transform: "translateY(100%)", opacity: 0 },
		enter: { transform: "translateY(0)", opacity: 1 },
		leave: { transform: "translateY(-100%)", opacity: 0 },
	});

	// dispatch SET_USER when logged in
	const setUser = (user) => {
		dispatch({ type: "SET_USER", payload: user });
	};

	// redirect if logged in
	if (state.user) return <Redirect to="/" />;

	return (
		<div className="auth-container">
			<div className="auth-wrapper">
				<div className="auth">
					<div className="welcome">
						<animated.h2 style={fadeIn}>Welcome Back</animated.h2>
						<animated.p style={fadeIn}>
							Sign in to access your personalized homepage, follow authors and
							topics you love and calp for stories that matter to you.
						</animated.p>
						<animated.img
							style={fadeUp}
							src={require("../../assets/img/student-colour.svg")}
						/>
					</div>
					<div className="form-wrapper">
						{transitions.map(
							({ item, key, props }) =>
								item && (
									<animated.div key={key} style={props}>
										<Switch location={item}>
											<Route setUser={setUser} path="/auth/login">
												<Login setUser={setUser} />
											</Route>
											<Route setUser={setUser} path="/auth/signup">
												<Signup setUser={setUser} />
											</Route>
											<Route setUser={setUser} path="/auth/forgotPassword">
												<ForgotPassword setUser={setUser} />
											</Route>
											<Route
												setUser={setUser}
												path="/auth/resetPassword"
												component={ResetPassword}
											>
												<ResetPassword setUser={setUser} />
											</Route>
											<Redirect to="/auth/login" />
										</Switch>
									</animated.div>
								)
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Auth;
