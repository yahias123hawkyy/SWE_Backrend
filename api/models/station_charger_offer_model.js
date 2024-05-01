const mongoose = require('mongoose');



const offer = new mongoose.Schema({
  Deadline: {
    type: String,
    required: true

  },
  Name: {
    type: String,
    required: true

  },
  newPrice: {
    type: Number, required: true

  }
})

const charger = new mongoose.Schema({
  stationId: {
    type: String,
    required: true
  },
  ID: {
    type: String,
    required: true
  },
  ConnectionTypeID: {
    type: Number,
    required: true
  },
  StatusTypeID: {
    type: Number
  },
  chargerStatus: {
    type: String,
  },
  LevelID: {
    type: Number,
    required: true
  },
  PowerKW: {
    type: Number,
    required: true
  },
  CurrentTypeID: {
    type: Number
  },
  Quantity: {
    type: Number,
    required: true
  },
  Price: {
    type: Number,
    required: true
  },
  Offers: [offer]
});;

const stationSchema = new mongoose.Schema({
  ID: { type: String, required: true },
  locationLat: { type: String, required: true },
  locationLong: { type: String, required: true },
  status: { type: String, required: true },
  chargers: [charger],
  title: { type: String, required: true },
  addressLine1: { type: String, required: true },
  addressLine2: { type: String, required: true },
  town: { type: String }

});

stationSchema.index({ title: 'text', addressLine1: 'text', addressLine2: "text" });





const Station = mongoose.model('Station', stationSchema);
const Charger = mongoose.model('Charger', charger);
const Offer = mongoose.model('Offer', offer);





module.exports = { Station, Charger, Offer };
