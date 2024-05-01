// models/ChargingSession.js
const mongoose = require('mongoose');

const chargingSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  chargerId: {
    type: String,
    // ref: 'Charger',
    required: true,
  },
  stationName: {
    type: String,
    // ref: 'Charger',
    required: true,
  },
  startTime: {
    type: Date,
    default: Date.now,
  },
  endTime: {
    type: Date,
  },
  powerWat: {
    type: Number,
    default: 0,
  },
  cost: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    default: 0,  // Duration in seconds
  },
  status: {
    type: String,
    enum: ['initialized', 'active', 'completed', 'cancelled'],
    default: 'active',
  },
  isConnected: {
    type: Boolean,
    default: true,  // Assume always connected for this simulation
  }
});

const ChargingSession = mongoose.model('ChargingSession', chargingSessionSchema);

module.exports = ChargingSession;
