import React, { useState } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Home from "../../views/Home/Home";
import Admin from "../../views/Admin/Admin";
import Header from "../../components/Header/Header";
import "../../index.css";
import "../../views/Admin/Login.css";
import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.passwordUpdate = this.passwordUpdate.bind(this);
    var password: "";
  }

  //When submit button is clicked, this function is activated
  passwordUpdate = () => {
    this.password = this.pwInput.value;
    console.log("password: ", this.password);

    //POST request is sent to backend to check if password is correct
    //_id and username are dumby variables that passport uses for authentication
    axios
      .post("/Admin/Login", {
        _id: "adminid",
        username: "admin",
        password: this.password
      })
      .then(res => {
        //if password is correct, the user is sent to /Admin/Home
        if (!res.data.success) {
          console.log("Not Authenticated user");
        } else {
          console.log("Authenticated user");
          this.props.history.push("/Admin/home");
        }
      });
  };

  render() {
    return (
      <div className="AdminApp">
        <Header />
        <center>
          <div className="AdminLogin">
            <b>
              <font size="7">Admin Login</font>
            </b>
          </div>
        </center>

        <form>
          <div className="pwBox">
            <input
              type="password"
              ref={pwInput => (this.pwInput = pwInput)}
              placeholder="Enter Password"
            />
          </div>
          <div className="submitButton">
            <button
              type="button"
              onClick={e => {
                this.passwordUpdate();
              }}
            >
              {" "}
              Submit{" "}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
