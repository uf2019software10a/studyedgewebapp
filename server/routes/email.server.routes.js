var email = require('../controllers/email.server.controller.js'),
    express = require('express'), //refers to Express the middleware helper for Node.js
    router = express.Router();


    router.route('/')
    .post(email.sendEmail);


module.exports= router;
