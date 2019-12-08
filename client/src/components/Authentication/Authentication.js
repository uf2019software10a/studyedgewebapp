import React, { useState } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import axios from "axios";

class Authentication extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false
    };
  }
  controller = new AbortController();

  componentDidMount() {
    //GET request to see if user is authenticated
    axios.get("/Admin/home").then(res => {
      console.log("/Admin/home get request from authentication.js");
      this.setState({
        authenticated: res.data.success
      });
      //if user is not authenticated, user is redirected to /Admin/login
      if (!this.state.authenticated) {
        this.props.history.push("/Admin/login");
        console.log("Not Authenticated user");
      } else {
        console.log("Authenticated user");
      }
    });
  }

  //abort get request in componentDidUpdate() to redirect to /Admin/Login without errors
  componentWillUnmount() {
    this.controller.abort();
  }

  //coninuously sending GET request to check if user is authenticated
  componentDidUpdate() {
    axios.get("/Admin/home").then(res => {
      console.log("/Admin/home get request from authentication.js");
      this.setState({
        authenticated: res.data.success
      });
      //if user is not authenticated, user is redirected to /Admin/login
      if (!this.state.authenticated) {
        this.props.history.push("/Admin/login");
        console.log("Not Authenticated user");
      } else {
        console.log("Authenticated user");
      }
    });
  }

  render() {
    if (!this.state.authenticated) {
      return <div>{this.state.authenticated}</div>;
    }
    return <div>{this.props.children}</div>;
  }
}

export default withRouter(Authentication);
