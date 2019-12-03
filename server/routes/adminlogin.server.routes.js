const express = require("express"),
  router = express.Router(),
  axios = require("axios"),
  passport = require("passport");

router.post("/login", passport.authenticate("local"), function(req, res) {
  const password = req.body.password;
  const username = req.body.username;
  const id = req.body._id;
  /*console.log("password sent:", password);
  console.log("username sent:", username);
  console.log("id sent:", id);*/
  console.log("req.isAuthenticated: ", req.isAuthenticated());
  if (req.isAuthenticated()) {
    console.log("req.user.password:", req.user.password);
    return res.send({
      success: true,
      message: "login was successful",
      user: req.user
    });
  } else {
    res.send({
      success: false,
      message: "failed to authenticate"
    });
  }
});

router.get("/home", (req, res) => {
  console.log("get request to /Admin/home");
  console.log("req.isAuthenticated: ", req.isAuthenticated());
  if (req.isAuthenticated()) {
    return res.send({ success: true, message: "user is authenticated" });
  } else {
    res.send({ success: false, message: "user is not authenticated" });
  }
});

module.exports = router;
