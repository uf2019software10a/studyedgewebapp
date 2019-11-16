var exams = require('../controllers/exam.server.controller.js'),
    express = require('express'), //refers to Express the middleware helper for Node.js
    router = express.Router(); //refers to the Router() function in Express the middleware helper for Node.js


router.route('/')
  .get(exams.list);

router.route('/className=:className')
  .get(exams.list);

router.route('/examNum=:examNum')
  .get(exams.list);

module.exports = router;
