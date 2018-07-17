//Require express && setup router
const router = require('express').Router();

//Require controllers
const post = require('../controllers/post');

/*********************************************/

//Create new post
router.post('/new_post', post.create_post)

/*********************************************/

//GET request for all entrys for user control
router.get('/', getController.get_all);

//GET request for all entrys for user control
router.get('/archived', getController.get_all_archived);

//GET request for entrys by title
router.get('/title/:title', getController.get_by_title);

//GET request for entrys by id
router.get('/id/:id', getController.get_by_id);

//GET request for entrys by author
router.get('/author/:author', getController.get_by_author);

//GET request for entrys by year
router.get('/date/year/:year', getController.get_by_date_year);

//GET request for entrys by month
router.get('/date/month/:month', getController.get_by_date_month);

//GET request for entrys by day
router.get('/date/day/:day', getController.get_by_date_day);

//GET request for entrys by type
router.get('/type/:type', getController.get_by_type);

//GET request for entrys by tag
router.get('/tag/:tag', getController.get_by_tag);

/*********************************************/
//Update post with id
router.put('/id/:id', post.put_by_id);

//Update post with title
router.put('/title/:title', post.put_by_title);

/*********************************************/

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

/**********************************************/

//Export router
module.exports = router;