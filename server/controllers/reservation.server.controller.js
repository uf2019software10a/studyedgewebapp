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
      var user_id = req.params["user"];
      var exam_id = req.params["exam"];
      Reservation.deleteOne({user_id: user_id, exam_id: exam_id}, function (err, contact) {
          if (err) {
            console.log(err);
            res.send(err);
          }
          if (contact.deletedCount == 0) {
            res.json({
                status: "error",
                message: 'Reservation not found'
            });
          } else {
            res.json({
                status: "success",
                message: 'Reservation deleted'
            });
          }
      }).exec();
    };


    /* Create a reservation */
    exports.create = function(req, res) {
      var reservation = new Reservation(req.body);
      reservation.save(function(err) {
        if(err) {
          console.log(err);
          res.status(400).send(err);
        } else {
          res.json(reservation);
          console.log(reservation);
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
