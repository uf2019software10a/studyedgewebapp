var exams = require('../controllers/exam.server.controller.js'),
    express = require('express'), //refers to Express the middleware helper for Node.js
    router = express.Router(); //refers to the Router() function in Express the middleware helper for Node.js


router.route('/')
  .get(exams.list)
  //.put(exams.update)
  .post(exams.create);

router.route('/id=:id')
  .get(exams.read)
    .put(exams.update)
  .delete(exams.delete);

router.route('/className=:className')
  .get(exams.read);

router.route('/examNum=:examNum')
  .get(exams.read);

router.route('/className=:className/examNum=:examNum')
  .delete(exams.delete);

router.param('className', exams.examByClass);
router.param('examNum', exams.examByNum);
router.param('id', exams.examByID);

module.exports = router;
