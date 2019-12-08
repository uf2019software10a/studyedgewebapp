import React, { useState } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import axios from "axios";

class Logout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedout: false
    };
  }

  componentDidMount() {
    //GET request to destroy session and delete cookie
    axios.get("/Admin/logout").then(res => {
      console.log("/Admin/login get request from logout.js");
      this.setState({
        loggedout: res.data.success
      });
      //if logged out, redirect to /Admin/Login
      if (this.state.loggedout) {
        this.props.history.push("/Admin/login");
        console.log("logged out");
      } else {
        console.log("error logging out");
      }
    });
  }

  render() {
    if (!this.state.loggedout) {
      return <div>{this.state.loggedout}</div>;
    }
    return (
      <div>
        <Redirect to="/Admin/Login" />
      </div>
    );
  }
}

export default withRouter(Logout);
