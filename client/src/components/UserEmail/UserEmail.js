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
    //get url parameters
    if(!(typeof this.props.match === "undefined")) { // props exist -> parameters input correctly
      const email = this.props.match.params.email;
      const fname = this.props.match.params.fname;
      const lname = this.props.match.params.lname;

      // create user object
      const user = {
        email: email,
        name: fname + " " + lname
      };

      // call POST user api
      axios
        .post("/api/users/", user)
        .then(res => { // successful post
          this.setState({
            isUser: true
          });
          console.log("RESPONSE DATA: ", res.data);

          // redirect to home
          if(this.state.isUser) {
            this.props.history.push("/Home");
          }
        })
        .catch(error => { // error on post
          console.log(error);
          if(error.response.data.code === 11000) { // duplicate key error -> user already exists
            this.setState({
              isUser: true
            });
          }

          // redirect to home
          if(this.state.isUser) {
            this.props.history.push("/Home");
          }
        });
    }
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

export default UserEmail;
