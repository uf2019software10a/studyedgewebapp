var reservations = require('../controllers/reservation.server.controller.js'),
    express = require('express'), //refers to Express the middleware helper for Node.js
    router = express.Router(); //refers to the Router() function in Express the middleware helper for Node.js

router.route('/user=:userId')
  .get(reservations.read);

router.route('/exams=:examId')
  .get(reservations.read);

router.route('/user=:userId/exams=:examId')
  .post(reservations.create)
  .delete(reservations.delete);


router.param('userId', users.getUserId);
router.param('examId', users.getExamId);

module.exports = router;
