var users = require('../controllers/user.server.controller.js'),
    express = require('express'), //refers to Express the middleware helper for Node.js
    router = express.Router(); //refers to the Router() function in Express the middleware helper for Node.js

router.route('/username=:userName')
  .get(users.list);

router.route('/email=:userEmail')
  .get(users.list);

router.param('userName', users.userByName);
router.param('userEmail', users.userByEmail);

module.exports = router;
