const express = require('express');
const router = express.Router();
const carController = require('../controllers/car_controller');

router.post('/cars', carController.addCar);
router.get('/cars/:userId', carController.listCarsByUser); 

module.exports = router;