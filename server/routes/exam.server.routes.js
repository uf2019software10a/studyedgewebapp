var exams = require('../controllers/exam.server.controller.js'),
    express = require('express'), //refers to Express the middleware helper for Node.js
    router = express.Router(); //refers to the Router() function in Express the middleware helper for Node.js


router.route('/')
  .get(exams.list);

router.route('/className=:className')
  .get(exams.read);

router.route('/examNum=:examNum')
  .get(exams.read);

router.param('className', exams.examByClass);
router.param('examNum', exams.examByNum);

module.exports = router;
