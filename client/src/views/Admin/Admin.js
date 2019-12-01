import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "../../views/Home/Home";
import Admin from "../../views/Admin/Admin";
import Header from "../../components/Header/Header";
import "../../index.css";
import "../../views/Admin/Admin.css";
import axios from "axios";

class AdminApp extends React.Component {
  passwordUpdate = () => {
    const password = this.pwInput.value;
    console.log("password: ", password);

    axios
      .post("/Admin/login", { password: password })
      .then(res => {
        console.log("axios sent:", res.data);
      })
      .catch(function(err) {
        console.log(err);
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
              type="text"
              ref={pwInput => (this.pwInput = pwInput)}
              placeholder="Enter Password"
            />
          </div>
          <div className="submitButton">
            <button
              type="button"
              onClick={e => {
                this.passwordUpdate();
                e.preventDefault();
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

export default AdminApp;
