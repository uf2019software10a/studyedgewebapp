/* Dependencies */
var mongoose = require('mongoose'),
    Reservation = require('../models/schema.js').reservation;
    ExamTile = require('../models/schema.js').examTile;
    User = require('../models/schema.js').user;

    /* Show the current reservation */
    exports.read = function(req, res) {
      res.json(req.reservation);
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
      var reservations = new Reservation(req.body);
      Reservation.save(function(err) {
        if(err) {
          console.log(err);
          res.status(400).send(err);
        } else {
          res.json(reservations);
          console.log(reservations);
        }
      });
    };


    /* Middleware: find a user by its name, then pass it to the next request handler. */
    exports.getResByUserId = function(req, res, next, userId) {
      var id = mongoose.Types.ObjectId(userId);
      Reservation.find({user_id: id}).exec(function(err, reservation) {
        if(err) {
          res.status(400).send(err);
        } else {
          req.reservation = reservation;
          next();
        }
      });
    };

    /* Middleware: find a user by its email, then pass it to the next request handler. */
    exports.getResByExamId = function(req, res, next, examId) {
      var id = mongoose.Types.ObjectId(examId);
      Reservation.find({exam_id: id}).exec(function(err, reservation) {
        if(err) {
          res.status(400).send(err);
        } else {
          req.reservation = reservation;
          next();
        }
      });
    };
