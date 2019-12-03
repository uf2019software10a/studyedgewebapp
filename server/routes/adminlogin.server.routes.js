const express = require("express"),
  router = express.Router(),
  axios = require("axios"),
  passport = require("passport");

/*router.post("/Login", function(req, res) {
  const password = req.body.password;
  console.log("password sent:", password);
});*/

/*router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/Admin/home",
    failureRedirect: "/Admin/login"
  }),
  function(req, res) {
    const password = req.body.password;
    const username = req.body.username;
    const id = req.body._id;
    console.log("password sent:", password);
    console.log("username sent:", username);
    console.log("id sent:", id);
  }
);*/

router.post("/login", passport.authenticate("local"), function(req, res) {
  const password = req.body.password;
  const username = req.body.username;
  const id = req.body._id;
  console.log("password sent:", password);
  console.log("username sent:", username);
  console.log("id sent:", id);
  console.log("req.isAuthenticated: ", req.isAuthenticated());
  if (req.isAuthenticated()) {
    console.log("req.user.password:", req.user.password);
  }
  /*if (req.isAuthenticated()) {
    return res.send(req.user);
  } else {
    res.send({
      success: false,
      message: "failed to authenticate"
    });
  }*/
});

module.exports = router;
