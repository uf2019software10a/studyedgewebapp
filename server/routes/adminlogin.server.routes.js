const express = require("express"),
  router = express.Router(),
  axios = require("axios"),
  passport = require("passport");

//when the user submits the password in /Admin/Login, a POST request is sent here
//Passport.js file is called to authenticate user
router.post("/login", passport.authenticate("local"), function(req, res) {
  console.log("isAuthenticated: ", req.isAuthenticated());
  if (req.isAuthenticated()) {
    return res.send({
      success: true,
      message: "login was successful"
    });
  } else {
    res.send({
      success: false,
      message: "failed to login"
    });
  }
});

//Admin/Home GET request to retrieve whether user is authenticated or not
//Sends back whether user is authenticated or not to Authentication.js file
router.get("/home", (req, res) => {
  console.log("req.isAuthenticated: ", req.isAuthenticated());
  if (req.isAuthenticated()) {
    return res.send({ success: true, message: "user is authenticated" });
  } else {
    res.send({ success: false, message: "user is not authenticated" });
  }
});

//Admin/logout GET request to destroy session and clear cookie
router.get("/logout", (req, res) => {
  req.session.destroy(err => {
    console.log("req.session.destroy in /Admin/logout get request");
    if (err) {
      return res.send({ success: false, message: "error logging out" });
    } else {
      res.clearCookie("sessionid").send({
        success: true,
        message: "successfully cleared cookie and logged out"
      });
      req.logout();
      console.log(req.isAuthenticated());
    }
  });
});

module.exports = router;
