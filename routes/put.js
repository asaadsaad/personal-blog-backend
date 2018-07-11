//Require express && setup router
const router = require('express').Router();

//Require controllers
const putController = require('../controllers/put');

//PUT request for entrys by id
router.put('/id/:id', putController.by_id);

//PUT request for entrys by title
router.put('/title/:title', putController.by_title);

//Export router
module.exports = router;