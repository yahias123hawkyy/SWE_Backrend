const express = require('express');
const chargingSessionController = require('../controllers/charging_session_controller');
const router = express.Router();




router.post('/chargingSessions/create', chargingSessionController.createSession);


// router.get('/chargingSessions/:sessionId/simulateConnection', chargingSessionController.startConnectionSimulation);


router.post('/chargingSessions/simulateConnection', chargingSessionController.startConnectionSimulation);

// Route to start a charging session
router.post('/chargingSessions/start', chargingSessionController.startSession);

// Route to get the current session status
router.get('/chargingSessions/:sessionId', chargingSessionController.getSession);

// Route to stop a charging session
router.post('/chargingSessions/stop', chargingSessionController.stopSession);

module.exports = router;
