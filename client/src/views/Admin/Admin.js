import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "../../views/Home/Home";
import Admin from "../../views/Admin/Admin";
import Header from "../../components/Header/Header";
import "../../index.css";
import "../../views/Admin/Admin.css";

const AdminApp = ({ exams }) => {
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
        <input type="text" placeholder="Enter Password" />
        <button> Submit </button>
      </form>
    </div>
  );
};

export default AdminApp;
