var reservations = require('../controllers/reservation.server.controller.js'),
    exams = require('../controllers/exam.server.controller.js'),
    users = require('../controllers/user.server.controller.js'),
    express = require('express'), //refers to Express the middleware helper for Node.js
    router = express.Router(); //refers to the Router() function in Express the middleware helper for Node.js

router.route('/user=:userId')
  .get(users.read);

router.route('/exam=:examId')
  .get(exams.read);

router.route('/user=:userId/exams=:examId')
  .post(reservations.create)
  .delete(reservations.delete);


router.param('userId', reservations.getResByUserId);
router.param('examId', reservations.getResByExamId);

module.exports = router;
