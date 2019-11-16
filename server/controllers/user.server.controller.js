
/* Dependencies */
var mongoose = require('mongoose'),
    ExamTile = require('../models/schema.js').examTile;
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

    /*
      Middleware: find an exam by its ID, then pass it to the next request handler.

      HINT: Find the listing using a mongoose query,
            bind it to the request object as the property 'listing',
            then finally call next
     */
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


/* Create a user */
// exports.create = function(req, res) {
//
//   /* Instantiate a Listing */
//   var listing = new Listing(req.body);
//
//   /* Then save the listing */
//   listing.save(function(err) {
//     if(err) {
//       console.log(err);
//       res.status(400).send(err);
//     } else {
//       res.json(listing);
//       console.log(listing)
//     }
//   });
// };

/* Show the current listing */
exports.read = function(req, res) {
  /* send back the listing as json from the request */
  res.json(req.listing);
};

/* Update a listing - note the order in which this function is called by the router*/
exports.update = function(req, res) {
  var listing = req.listing;

  /* Replace the listings's properties with the new properties found in req.body */
   Listing.findById(req.listing._id, function (err, listing) {
     if (err)
         res.send(err);

     listing.code = req.body.code;
     listing.name = req.body.name;
     listing.address = req.body.address ? req.body.address : listing.address;

     /*save the coordinates (located in req.results if there is an address property) */
     if(req.results) {
       listing.coordinates = {
         latitude: req.results.lat,
         longitude: req.results.lng
       };
     }

     /* Save the listing */
     listing.save(function(err) {
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

/* Delete a listing */
exports.delete = function(req, res) {
  var listing = req.listing;

  /* Add your code to remove the listings */
  Listing.remove({
      _id: listing._id
  }, function (err, contact) {
      if (err) {
        console.log(err);
        res.send(err);

      }

      res.json({
          status: "success",
          message: 'Listing deleted'
      });
  });
};
