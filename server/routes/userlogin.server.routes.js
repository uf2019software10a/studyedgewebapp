const express = require("express"),
  router = express.Router(),
  axios = require("axios");

//get request for the email from /userlogin/:email
router.get("/:email/:name", (req, res) => {
  var useremail = req.params.email;
  var username = req.params.name;
  console.log("email given:", useremail);
  console.log("name given:", username);
  return res.send({ success: true, email: useremail, name: username });
});

router.get("/", (req, res) => {
  return res.send({ success: true });
});

module.exports = router;
