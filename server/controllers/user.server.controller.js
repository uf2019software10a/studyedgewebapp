
/* Dependencies */
var mongoose = require('mongoose'),
    User = require('../models/schema.js').user;


    /* Retreive all the users,  */
    exports.list = function(req, res) {
      User.find({}, function(err, exams) {
        var arr = [];

        listings.forEach(function(exams) {
          arr.push(exams);
        });

        res.send(arr);
      });
    };


    /* Middleware: find a user by its ID, then pass it to the next request handler. */
    exports.userById = function(req, res, next, id) {
      User.findById(id).exec(function(err, user) {
        if(err) {
          res.status(400).send(err);
        } else {
          req.user = user;
          next();
        }
      });
    };

    /* Middleware: find a user by its name, then pass it to the next request handler. */
    exports.userByName = function(req, res, next, userName) {
      ExamTile.find({name: userName}).exec(function(err, user) {
        if(err) {
          res.status(400).send(err);
        } else {
          req.user = user;
          next();
        }
      });
    };

    /* Middleware: find a user by its email, then pass it to the next request handler. */
    exports.userByEmail = function(req, res, next, userEmail) {
      ExamTile.find({email: userEmail}).exec(function(err, user) {
        if(err) {
          res.status(400).send(err);
        } else {
          req.user = user;
          next();
        }
      });
    };


    /* Show the current user */
    exports.read = function(req, res) {
      res.json(req.user);
    };
