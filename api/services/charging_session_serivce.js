const ChargingSession = require('../models/charging_session_model');

async function createSessionId(sessionData) {
  const session = new ChargingSession({
    userId: sessionData.userId,
    chargerId: sessionData.chargerId,
    stationName: sessionData.stationName
  });
  await session.save();
  return session._id;
}

async function simulateConnectionStatus(sessionId) {
  // setTimeout(async () => {
  //   const session = await ChargingSession.findByIdAndUpdate(sessionId, {
  //     isConnected: true,
  //     startTime: new Date()  // Start charging once connected
  //   }, { new: true });
  //   return session;
  // }, 200000); 
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const session = await ChargingSession.findByIdAndUpdate(sessionId, {
          isConnected: true,
          startTime: new Date()  
        }, { new: true });  

        resolve(session);  
      } catch (error) {
        reject(error);  
      }
    }, 3000); 
  });
}

async function startChargingSession(sessionId) {
  const session = await ChargingSession.findByIdAndUpdate(sessionId, {
    status: 'active',
    startTime: new Date()
  }, { new: true });
  console.log("andf");
  console.log(session);
  return session;
}

async function getChargingSession(sessionId) {
    const session = await ChargingSession.findById(sessionId);
    if (session && session.status === 'active') {
      // Simulate updates
      const now = new Date();
      const secondsPassed = (now.getTime() - session.startTime.getTime()) / 1000;
      const powerIncrease = 0.5; // Power increase per second
      const costIncrease = 0.1;  // Cost increase per second
  
      session.powerWat += powerIncrease;
      session.cost += costIncrease * secondsPassed; // Cost accumulates based on time
      session.duration = secondsPassed;
  
      await session.save();
    }
    return session;
  }
async function stopChargingSession(sessionId) {
  return await ChargingSession.findByIdAndUpdate(sessionId, {
    status: 'completed',
    endTime: new Date()
  }, { new: true });
}

module.exports = {
  createSessionId,
  simulateConnectionStatus,
  startChargingSession,
  getChargingSession,
  stopChargingSession,
};
