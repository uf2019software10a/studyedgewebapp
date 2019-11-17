
/* Dependencies */
var mongoose = require('mongoose'),
    User = require('../models/schema.js').user;


    /* Retreive all the users,  */
    exports.list = function(req, res) {
      User.find({}, function(err, users) {
        var arr = [];

        users.forEach(function(user) {
          arr.push(user);
        });

        res.send(arr);
      });
    };

    /* Delete a user */
    exports.delete = function(req, res) {
      // Check if array or singular object
      if(req.user.constructor === Array) {
        if(req.user.length === 0) { // EMPTY ARRAY
          res.json({
              status: "error",
              message: 'User not found'
          });
        } else {
          user = req.user[0];
        }
      } else {
        user = req.user;
      }

      User.deleteOne({_id: user._id}, function (err, contact) {
          if (err) {
            console.log(err);
            res.send(err);
          }
          if (contact.deletedCount == 0) {
            res.json({
                status: "error",
                message: 'User not found'
            });
          } else {
            res.json({
                status: "success",
                message: 'User deleted'
            });
          }
      }).exec();
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
      User.find({name: userName}).exec(function(err, user) {
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
      User.find({email: userEmail}).exec(function(err, user) {
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
