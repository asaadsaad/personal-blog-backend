//Require express && setup new express router
const router = require('express').Router();

//Require controllers
const getController = require('../controllers/get');

//GET request for all entrys
router.get('/', getController.get_all);

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

//Export router
module.exports = router;