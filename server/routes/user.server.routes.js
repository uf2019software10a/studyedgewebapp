var users = require('../controllers/user.server.controller.js'),
    express = require('express'), //refers to Express the middleware helper for Node.js
    router = express.Router(); //refers to the Router() function in Express the middleware helper for Node.js


router.route('/')
  .get(users.list)
  .put(users.update)
  .post(users.create);;

router.route('/id=:id')
  .delete(users.delete);

router.route('/userName=:userName')
  .get(users.read);

router.route('/userEmail=:userEmail')
  .get(users.read)
  .delete(users.delete);


router.param('userName', users.userByName);
router.param('userEmail', users.userByEmail);
router.param('id', users.userById);

module.exports = router;
