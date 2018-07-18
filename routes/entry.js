//Require express && setup router
const router = require('express').Router();

//Require controllers
const entryController = require('../controllers/entry');

/*********************************************/

//Create new post
router.post('/create', entryController.create);

/*********************************************/

//GET request for all entrys for user control
router.get('/retrieve', entryController.retrieve);

// //GET request for all entrys for user control
router.get('/retrieve_archived', entryController.retrieve_archived);

// //GET request for entrys by title
router.get('/retrieve_title/:title', entryController.retrieve_title);

// //GET request for entrys by id
router.get('/retrieve_id/:id', entryController.retrieve_id);

// //GET request for entrys by author
router.get('/retrieve_author/:author', entryController.retrieve_author);

// //GET request for entrys by year
router.get('/retrieve_year/:year', entryController.retrieve_year);

// //GET request for entrys by month
router.get('/retrieve_month/:month', entryController.retrieve_month);

// //GET request for entrys by day
router.get('/retrieve_date/day/:day', entryController.retrieve_day);

// //GET request for entrys by type
router.get('/retrieve_type/:type', entryController.retrieve_type);

// //GET request for entrys by tag
router.get('/retrieve_tag/:tag', entryController.retrieve_tag);

/*********************************************/
//Update post with id
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