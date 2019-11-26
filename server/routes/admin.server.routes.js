var admin = require('../controllers/admin.server.controller.js'),
    express = require('express'), //refers to Express the middleware helper for Node.js
    router = express.Router(); //refers to the Router() function in Express the middleware helper for Node.js


router.route('/Admin/login')
  .get(admin.list)

module.exports = router;
