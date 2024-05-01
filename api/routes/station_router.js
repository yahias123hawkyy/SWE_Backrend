const express = require('express');
const router = express.Router();



const { listAvailableStations, getSearchResults, stationsSender } = require('../controllers/station_controler');

router.get('/available', listAvailableStations);
router.get('/search', getSearchResults);
router.post('/stations', stationsSender);



module.exports = router;