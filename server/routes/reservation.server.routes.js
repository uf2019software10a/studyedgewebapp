var reservations = require('../controllers/reservation.server.controller.js'),
    exams = require('../controllers/exam.server.controller.js'),
    users = require('../controllers/user.server.controller.js'),
    express = require('express'), //refers to Express the middleware helper for Node.js
    router = express.Router(); //refers to the Router() function in Express the middleware helper for Node.js

router.route('/')
  .post(reservations.create);

router.route('/user=:userId')
  .get(reservations.read);

router.route('/exam=:examId')
  .get(reservations.read);

router.route('/user=:user/exam=:exam')
  .delete(reservations.delete);


router.param('userId', reservations.getResByUserId);
router.param('examId', reservations.getResByExamId);

module.exports = router;
