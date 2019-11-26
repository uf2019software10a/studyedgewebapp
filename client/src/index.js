import React, { useState } from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import exams from './data/exams.json'
import AdminApp from "./views/Admin/Admin"
import NotFound from "./views/NotFound"


ReactDOM.render(
    <Router>
      <Switch>
        <Route path="/Home">
          <App exams = {exams}/>
        </Route>
        <Route exact path="/">
          <Redirect to="/Home"/>
        </Route>
        <Route exact path="/Admin/login">
          <AdminApp exams ={exams}/>
        </Route>
        <Route path="/Admin">
          <Redirect to="/Admin/login"/>
        </Route>
        <Route component={NotFound}/>
      </Switch>
    </Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
