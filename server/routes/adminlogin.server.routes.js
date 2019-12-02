const express = require("express"),
  router = express.Router(),
  axios = require("axios"),
  passport = require("passport");

router.post("/Login", function(req, res) {
  const password = req.body.password;
  console.log("password sent:", password);
});

/*router.post(
  "/Admin/login",
  passport.authenticate("local", {
    successRedirect: "/Admin",
    failureRedirect: "/Admin/login"
  })
);*/

/*router.post("/login", passport.authenticate("local"), function(req, res) {
  const password = req.body.password;
  console.log("password sent:", password);
});*/

module.exports = router;
