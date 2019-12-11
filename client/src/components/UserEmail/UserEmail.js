import React, { useState } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import axios from "axios";

class UserEmail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isUser: false
    };
  }

  componentDidMount() {
    //GET request to see if user has a valid email
    axios.get("/userlogin").then(res => {
      console.log("/:email get request from UserEmail.js");
      this.setState({
        isUser: res.data.success
      });
      //if email is valid, user is redirected to /Home
      if (!this.state.isUser) {
        this.props.history.push("/Home");
        console.log("Valid Email");
      } else {
        console.log("Invalid Email");
      }
    });
  }

  render() {
    return (
      <div>
        <h1>Invalid User</h1>
        {this.state.isUser}
      </div>
    );
  }
}

export default withRouter(UserEmail);
