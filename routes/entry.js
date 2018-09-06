//Require express && setup router
const router = require('express').Router();

//Require controllers
const entryController = require('../controllers/entry');

/*********************************************/

//Create new post || TESTED || WORKING
router.post('/create', entryController.create);

/*********************************************/

//GET request for all entrys for user control || TESTED || WORKING
router.get('/retrieve_all', entryController.retrieve_all);

//GET request for all entrys for user control || TESTED || WORKING
router.get('/retrieve_archived', entryController.retrieve_archived);

//GET request for entrys by title || TESTED || WORKING
router.get('/retrieve_title/:title', entryController.retrieve_title);

//GET request for entrys by id || TESTED || WORKING
router.get('/retrieve_id/:id', entryController.retrieve_id);

//GET request for entrys by author || TESTED || WORKING
router.get('/retrieve_author/:author', entryController.retrieve_author);

//GET request for entrys by year || TESTED || WORKING
// router.get('/retrieve_year/:year', entryController.retrieve_year);

//GET request for entrys by month
// router.get('/retrieve_month/:month', entryController.retrieve_month);

//GET request for entrys by day
// router.get('/retrieve_date/day/:day', entryController.retrieve_day);

//GET request for entrys by type || TESTED || WORKING
router.get('/retrieve_type/:type', entryController.retrieve_type);

//GET request for entrys by tag || TESTED || WORKING
router.get('/retrieve_tag/:tag', entryController.retrieve_tag);

/*********************************************/
//Update post with id || TESTED || WORKING
router.put('/update_id/:id', entryController.update_id);

//Update post with title
router.put('/update_title/:title', entryController.update_title);

/*********************************************/

//DELETE request for all entrys all
router.delete('/remove', entryController.remove);

//DELETE request for entrys by id
router.delete('/remove_id/:id', entryController.remove_id);

//GET request for entrys by title
router.delete('/remove_title/:title', entryController.remove_title);

//GET request for entrys by author
router.delete('/remove_author/:author', entryController.remove_author);

/**********************************************/

//Export router
module.exports = router;