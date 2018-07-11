//Require express && setup new express router
const router = require('express').Router();

//Require controllers
const postController = require('../controllers/post');

//GET request for all entrys
router.post('/', postController.post);

module.exports = router;