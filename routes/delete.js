//Require express && setup new express router
const router = require('express').Router();

//Require controllers
const deleteController = require('../controllers/delete');

//DELETE request for all entrys all
router.delete('/', deleteController.delete_all);

//DELETE request for entrys by id
router.delete('/id/:id', deleteController.delete_by_id);

//GET request for entrys by title
router.delete('/title/:title', deleteController.delete_by_title);

//GET request for entrys by author
router.delete('/author/:author', deleteController.delete_by_author);

//GET request for entrys by type
router.delete('/type/:type', deleteController.delete_by_type);

//DEPRECATED: Not sure if ill use this yet
//GET request for entrys by date
// router.delete('/date/:date', deleteController.delete_by_date);

//DEPRECATED: Not sure if ill use this yet
//GET request for entrys by tag
// router.delete('/tag/:tag', deleteController.delete_by_tag);

//Export router
module.exports = router;