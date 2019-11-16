var exam = require('../controllers/exam.server.controller.js'),
    express = require('express'), //refers to Express the middleware helper for Node.js
    router = express.Router(); //refers to the Router() function in Express the middleware helper for Node.js


router.route('/api/exams/')
  .get(exam.list);

router.route('/api/exams/className=:className')
  .get(exam.list)
  .post(getCoordinates, listings.create);

router.route('/api/exams/examNum=:examNum')
  .get(listings.read)
  .put(getCoordinates, listings.update)
  .delete(listings.delete);

router.param('listingId', listings.listingByID);

module.exports = router;
