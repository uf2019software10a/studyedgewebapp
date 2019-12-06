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

  componentDidMount() {
    axios.get("/Admin/home").then(res => {
      console.log("/Admin/home get request from authentication.js");
      this.setState({
        authenticated: res.data.success
      });
      if (!res.data.success) {
        this.props.history.push("/Admin/login");
        console.log("Not Authenticated user");
      } else {
        console.log("Authenticated user");
        //this.props.history.push("/Admin/home");
      }
    });
  }

  componentDidUpdate() {
    axios.get("/Admin/home").then(res => {
      console.log("/Admin/home get request from authentication.js");
      this.setState({
        authenticated: res.data.success
      });
      if (!res.data.success) {
        this.props.history.push("/Admin/login");
        console.log("Not Authenticated user");
      } else {
        console.log("Authenticated user");
        //this.props.history.push("/Admin/home");
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
