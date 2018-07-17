//Require express && setup new express router
const router = require('express').Router();
//Require controllers
const postController = require('../controllers/post');


router.post('/admin', postController.admin);

router.post('/admin/login', postController.admin_login);

module.exports = router;