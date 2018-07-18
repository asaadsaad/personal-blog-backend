//Require express && setup new express router
const router = require('express').Router();

//Require controllers
const adminController = require('../controllers/admin');

//Create new admin
router.post('/create', adminController.create);

//Login admin
router.post('/login', adminController.login);

//Retrieve all admin
router.get('/retrieve', adminController.retrieve);

//Retrieve admin with ID
router.get('/retrieve_id/:id', adminController.retrieve_id);

//Retrieve unactive admin
router.get('/retrieve_active/', adminController.retrieve_active);

//Retrieve active admin
router.get('/retrieve_unactive/', adminController.retrieve_unactive);

//Delete all admin
router.delete('/remove/', adminController.remove);

//Delete admin with ID
router.delete('/remove_id/:id', adminController.remove_id);

//Archive admin
router.put('/archive/:id', adminController.archive)

//Update admin with ID
router.put('/update/:id', adminController.update);

//Export router
module.exports = router;