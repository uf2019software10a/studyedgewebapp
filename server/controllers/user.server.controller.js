
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

    /* Show the current user */
    exports.read = function(req, res) {
      if(req.user) {
        res.json(req.user);
      } else {
        res.json({
            status: "error",
            message: "User not found"
          });
      }
    };

    /* Delete a user */
    exports.delete = function(req, res) {
      // Check if array or singular object
      try {
        user = req.user[0];
        user._id;
      } catch(e) {
        user = req.user;
      }

      // check if object is null
      try {
        user._id;
      } catch(e) {
        res.json({
            status: "error",
            message: "User not found"
        });
        return;
      }

      User.findById(req.user._id, function(err, user)
      {
          if(!err){
            user.deleteOne();
            res.json({
                status: "success",
                message: 'User deleted'
            });
          } else {
            res.json({
                status: "error",
                message: 'User not found'
            });
          }
      });
    };


        /* Create a user */
        exports.create = function(req, res) {
          var user = new User(req.body);
          try {
            user.save(function(err) {
              if(err) {
                console.log(err);
                res.status(400).send(err);
              } else {
                res.json(user);
                console.log(user);
              }
            });
          } catch(err) {
            console.log(err);
          }
        };

        /* Update a user */
        exports.update = function(req, res) {
          var user = req.userRouter;
          User.findById(user._id, function (err, user) {
             if (err)
                 res.send(err);

             user.name = req.body.name;
             user.email = req.body.email;

             user.save(function(err) {
               if(err) {
                 console.log(err);
                 res.status(400).send(err);
               } else {
                 res.json(user);
                 console.log(user)
               }
             });
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
