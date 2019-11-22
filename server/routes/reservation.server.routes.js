var reservations = require('../controllers/reservation.server.controller.js'),
    exams = require('../controllers/exam.server.controller.js'),
    users = require('../controllers/user.server.controller.js'),
    express = require('express'),
    router = express.Router();

router.route('/')
  .post(reservations.create);

router.route('/id=:id')
  .get(reservations.read)
  .delete(reservations.delete);

router.route('/user=:userId')
  .get(reservations.read);

router.route('/exam=:examId')
  .get(reservations.read);

router.route('/user=:user/exam=:exam')
  .get(reservations.find)
  .delete(reservations.delete);


router.param('userId', reservations.getResByUserId);
router.param('examId', reservations.getResByExamId);
router.param('id', reservations.reservationById);

module.exports = router;
