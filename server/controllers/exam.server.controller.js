
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


    /* Show the current exam */
    exports.read = function(req, res) {
      if(req.examTile) {
        res.json(req.examTile);
      } else {
        res.json({
            status: "error",
            message: "Exam not found"
          });
      }
    };


    /* Delete an examTile */
    exports.delete = function(req, res) {
      // Check if array or singular object
      try {
        examTile = req.examTile[0];
        examTile._id;
      } catch(e) {
        examTile = req.examTile;
      }

      // check if object is null
      try {
        examTile._id;
      } catch(e) {
        res.json({
            status: "error",
            message: "Exam not found"
        });
        return;
      }

      ExamTile.findById(req.examTile._id, function(err, examTile)
      {
          if(!err){
            examTile.deleteOne();
            res.json({
                status: "success",
                message: 'Exam deleted'
            });
          } else {
            res.json({
                status: "error",
                message: 'Exam not found'
            });
          }
      });
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
      ExamTile.findById(examTile._id, function (err, examTile) {
         if (err)
             res.send(err);

         examTile.class = req.body.class;
         examTile.exam_num = req.body.exam_num;
         examTile.start = req.body.start;
         examTile.end = req.body.end;
         examTile.online = req.body.online;
         examTile.location = req.body.location;
         examTile.capacity = req.body.capacity;
         examTile.enrolled = req.body.enrolled;
         examTile.tutor = req.body.tutor;

         examTile.save(function(err) {
           if(err) {
             console.log(err);
             res.status(400).send(err);
           } else {
             res.json(examTile);
             console.log(examTile)
           }
         });
      });
    };

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
