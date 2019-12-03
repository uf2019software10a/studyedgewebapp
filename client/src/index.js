import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import exams from "./data/exams.json";
import Login from "./views/Admin/Login";
import AdminHome from "./views/Admin/Admin";
import NotFound from "./views/NotFound";
import Authentication from "./components/Authentication/Authentication";
import axios from "axios";

var loggedIn = () => {
  axios.get("/Admin/home").then(res => {
    console.log("/Admin/home get request from index.js");
    var loggedin = res.data.success;
    return loggedin;
  });
};

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/Home">
        <App exams={exams} />
      </Route>
      <Route exact path="/">
        <Redirect to="/Home" />
      </Route>
      <Route exact path="/Admin/Login">
        <Login />
      </Route>
      <Authentication>
        <Route
          exact
          path="/Admin/home"
          render={() => <AdminHome exams={exams} />}
        />
      </Authentication>
      <Route component={NotFound} />
    </Switch>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//         <Route path="/Admin">
//          <Redirect to="/Admin/Login"/>
//        </Route>
serviceWorker.unregister();
