//Require express and setup router
const router = require('express').Router();

//Require Controllers
const statsController = require('../controllers/statistics');

//Create new document
router.post('/create', statsController.create);

//Post visits
router.patch('/daily/:id', statsController.daily);

//Delete document
router.delete('/remove', statsController.remove);

//Get visits
router.get('/retrieve', statsController.retrieve);

//Export router
module.exports = router;