var user = require('../controllers/user.server.controller.js'),
    express = require('express'), //refers to Express the middleware helper for Node.js
    router = express.Router(); //refers to the Router() function in Express the middleware helper for Node.js

router.route('/api/username=:userName')
  .get(user.list)
  .post(getCoordinates, listings.create);

router.route('/api/email=:userEmail')
  .get(listings.read)
  .put(getCoordinates, listings.update)
  .delete(listings.delete);

router.param('listingId', listings.listingByID);

module.exports = router;
