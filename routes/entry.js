//Require express && setup router
const router = require('express').Router();

//Require controllers
const entryController = require('../controllers/entry');

//DATES AREN'T PROPERLY UPDATED :<

/*********************************************/

//Create new post || TESTED || WORKING
router.post('/create', entryController.create);

/*********************************************/

//GET request for all entrys for user control || TESTED || WORKING
router.get('/retrieve', entryController.retrieve);

//GET request amount of total postse || TESTED || WORKING
router.get('/retrieve_amount/:type?', entryController.retrieve_amount);

//GET request for all entrys for user control || TESTED || WORKING
router.get('/retrieve_archived', entryController.retrieve_archived);

//GET request for entrys by title || TESTED || WORKING
router.get('/retrieve_title/:title', entryController.retrieve_title);

//GET request for entrys by id || TESTED || WORKING
router.get('/retrieve_id/:id', entryController.retrieve_id);

//GET request for entrys by author || TESTED || WORKING
router.get('/retrieve_author/:author', entryController.retrieve_author);

//GET request for entrys by year || TESTED || WORKING
router.get('/retrieve_year/:year', entryController.retrieve_year);

//GET request for entrys by month || TESTED || WORKING
router.get('/retrieve_month/:month', entryController.retrieve_month);

//GET request for entrys by day || TESTED || WORKING
router.get('/retrieve_day/:day', entryController.retrieve_day);

//GET request for entrys by type || NEEDS TESTING
router.get('/retrieve_type/:type', entryController.retrieve_type);

//GET request for entrys by tag || TESTED || WORKING
router.get('/retrieve_tag/:tag', entryController.retrieve_tag);

/*********************************************/
//Update post with id || TESTED || WORKING
router.put('/update_by_id/:id', entryController.update_by_id);

//Update post with title || TESTED || WORKING
router.put('/update_by_title/:title', entryController.update_by_title);

/*********************************************/

//DELETE request for all entrys all || TESTED || WORKING || TOUCH UP CODE
router.delete('/remove', entryController.remove);

//DELETE request for entrys by id || TESTED || WORKING
router.delete('/remove_id/:id', entryController.remove_id);

//GET request for entrys by title || TESTING || WORKING
router.delete('/remove_title/:title', entryController.remove_title);

//GET request for entrys by author || TESTED || WORKING
router.delete('/remove_author/:author', entryController.remove_author);

/**********************************************/
//FUTURE ROUTE IDEAS :
//1. GET || Return names of all authors
//2. GET || Return amount of authors
//3. GET || Return names of all titles


/**********************************************/


//Export router
module.exports = router;