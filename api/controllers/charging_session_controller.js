const chargingSessionService = require('../services/charging_session_serivce');

async function createSession(req, res) {
  try {
    const sessionId = await chargingSessionService.createSessionId(req.body);
    res.status(201).json({ sessionId });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function startConnectionSimulation(req, res) {
  try {
    const session = await chargingSessionService.simulateConnectionStatus(req.params.sessionId);
    res.json({ message: "Connection simulation started", session });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


async function startSession(req, res) {
    try {
      console.log(req.body.sessionId);
      const session = await chargingSessionService.startChargingSession(req.body.sessionId);
      res.json(session);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
  async function getSession(req, res) {
    try {
      const session = await chargingSessionService.getChargingSession(req.params.sessionId);
      res.json(session);
    } catch (error) {
      res.status(404).json({ message: 'Session not found' });
    }
  }
  
  async function stopSession(req, res) {
    try {
      const session = await chargingSessionService.stopChargingSession(req.body.sessionId);
      res.json(session);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

// Include other necessary functions: startSession, getSession, stopSession
// Add those as previously described or needed based on further functionality requirements.

module.exports = {
  createSession,
  startConnectionSimulation,
  startSession,
  getSession,
  stopSession,
  // Other functions as needed
};
