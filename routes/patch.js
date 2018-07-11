//Require express && setup router
const router = require('express').Router();

//Require controllers
const patchController = require('../controllers/patch');

//PATCH request for entrys by id
router.patch('/id/:id', patchController.patch_by_id);

//PATCH request for entrys by title
router.patch('/title/:title', patchController.patch_by_title);

//Export router
module.exports = router;