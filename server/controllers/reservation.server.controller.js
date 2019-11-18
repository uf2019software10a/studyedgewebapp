/* Dependencies */
var mongoose = require('mongoose'),
    Reservation = require('../models/schema.js').reservation;
    ExamTile = require('../models/schema.js').examTile;
    User = require('../models/schema.js').user;
    
    /* Show the current reservation */
    exports.read = function(req, res) {
      res.json(req.user);
    };

    /* Delete a reservation */
    exports.delete = function(req, res) {
      var reservation = req.reservation;
      Reservation.deleteOne({exam_id: user._id}, function (err, contact) {
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


    /* Create a reservation */
    exports.create = function(req, res) {
      console.log("REQ.BODY: " + req.body);
      console.log("req.user: " + req.user);
      console.log("req.examTile: " + req.examTile);
      Reservation.save(function(err) {
        if(err) {
          console.log(err);
          res.status(400).send(err);
        } else {
          res.json(user);
          console.log(user);
        }
      });
    };


    /* Middleware: find a user by its name, then pass it to the next request handler. */
    exports.getUserId = function(req, res, next, userId) {
      User.find({_id: userId}).exec(function(err, user) {
        if(err) {
          res.status(400).send(err);
        } else {
          req.user = user;
          next();
        }
      });
    };

    /* Middleware: find a user by its email, then pass it to the next request handler. */
    exports.getExamId = function(req, res, next, examId) {
      ExamTile.find({_id: examId}).exec(function(err, examTile) {
        if(err) {
          res.status(400).send(err);
        } else {
          req.examTile = examTile;
          next();
        }
      });
    };
