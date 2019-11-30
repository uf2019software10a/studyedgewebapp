const express = require("express"),
  router = express.Router(),
  axios = require("axios");

const passwordData = [];

axios.get("/Admin/Login").then(res => {
  passwordData.push(res.data);
  console.log("axios recieved:", passwordData[0]);
});

router.post(
  "/Admin/login",
  passport.authenticate("local", {
    successRedirect: "/Admin",
    failureRedirect: "/Admin/login"
  })
);

module.exports = router;
