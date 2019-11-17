
/* Dependencies */
var mongoose = require('mongoose'),
    ExamTile = require('../models/schema.js').examTile;


    /* Retreive all the directory listings, sorted alphabetically by listing code */
    exports.list = function(req, res) {
      ExamTile.find({}, function(err, examTiles) {
        var arr = [];
        examTiles.forEach(function(examTile) {
          arr.push(examTile)
        });
        res.send(arr);
      });
    };

    /* Delete an examTile */
    exports.delete = function(req, res) {
      var examTile = req.examTile[0];
      ExamTile.deleteOne({_id: examTile._id}, function (err, contact) {
          if (err) {
            console.log(err);
            res.send(err);
          }
          if (contact.deletedCount == 0) {
            res.json({
                status: "error",
                message: 'Exam ID not found'
            });
          } else {
            res.json({
                status: "success",
                message: 'Exam deleted'
            });
          }
      }).exec();
    };

    /* Create an exam */
    exports.create = function(req, res) {
      var examTile = new ExamTile(req.body);
      examTile.save(function(err) {
        if(err) {
          console.log(err);
          res.status(400).send(err);
        } else {
          res.json(examTile);
          console.log(examTile);
        }
      });
    };

    /* Update an exam */
    exports.update = function(req, res) {
      var examTile = req.examTile;
      Listing.findById(examTile._id, function (err, examTile) {
         if (err)
             res.send(err);

         examTile.class = req.body.class;
         examTile.exam_num = req.body.exam_num;
         examTile.start = req.body.start;
         examTile.end = req.body.end;
         examTile.online = req.body.online;
         exam.location = {
           building: req.results.building,
           floor: req.results.floor,
           description: req.results.description,
         }
         examTile.capacity = req.body.capacity;
         examTile.enrolled = req.body.enrolled;
         examTile.tutor = req.body.tutor;

         examTile.save(function(err) {
           if(err) {
             console.log(err);
             res.status(400).send(err);
           } else {
             res.json(listing);
             console.log(listing)
           }
         });
      });
    }

    /* Middleware: find an exam by its ID, then pass it to the next request handler. */
    exports.examByID = function(req, res, next, id) {
      ExamTile.findById(id).exec(function(err, examTile) {
        if(err) {
          res.status(400).send(err);
        } else {
          req.examTile = examTile;
          next();
        }
      });
    };

    /* Middleware: find an exam by its class name, then pass it to the next request handler. */
    exports.examByClass = function(req, res, next, className) {
      ExamTile.find({class: className}).exec(function(err, examTile) {
        if(err) {
          res.status(400).send(err);
        } else {
          req.examTile = examTile;
          next();
        }
      });
    };

    /* Middleware: find an exam by its exam number, then pass it to the next request handler. */
    exports.examByNum = function(req, res, next, examNum) {
      ExamTile.find({exam_num: examNum}).exec(function(err, examTile) {
        if(err) {
          res.status(400).send(err);
        } else {
          req.examTile = examTile;
          next();
        }
      });
    };


    /* Show the current listing */
    exports.read = function(req, res) {
      /* send back the listing as json from the request */
      res.json(req.examTile);
    };
