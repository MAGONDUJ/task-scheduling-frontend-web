import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
//import { Router, Route, Switch, Redirect } from "react-router-dom";
import {  Router } from "react-router-dom"
import { Provider } from "react-redux";

import jwt_decode from "jwt-decode";

import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import store from "./store";

const hist = createBrowserHistory();

// Check for token
if (localStorage.jwtToken) {
	// Set auth token header auth
	setAuthToken(localStorage.jwtToken);
	// Decode token and get user info and exp
	const decoded = jwt_decode(localStorage.jwtToken);
	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));

	// Check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		// Logout user
		store.dispatch(logoutUser());
		// Clear current Profile
		store.dispatch(clearCurrentProfile());
	}
}

ReactDOM.render(
	<Provider store={store}>
		<Router history={hist}>
			<App />
		</Router>
	</Provider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
