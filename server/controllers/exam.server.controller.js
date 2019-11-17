
/* Dependencies */
var mongoose = require('mongoose'),
    ExamTile = require('../models/schema.js').examTile;
    user = require('../models/schema.js').user;


    /* Retreive all the directory listings, sorted alphabetically by listing code */
    exports.list = function(req, res) {
      /* Add your code */
      ExamTile.find({}, function(err, examTiles) {
        var arr = [];

        examTiles.forEach(function(examTile) {
          arr.push(examTile)
        });

        res.send(arr);
      });
    };

    /* Middleware: find a listing by its ID, then pass it to the next request handler. */
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

    /* Middleware: find a listing by its class name, then pass it to the next request handler. */
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

    /* Middleware: find a listing by its class name, then pass it to the next request handler. */
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
