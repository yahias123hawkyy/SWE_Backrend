const { Station, Charger } = require('../models/station_charger_offer_model');

const mongoose = require('mongoose');


const url = 'mongodb://localhost:27017/SWE';



mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));



const getAvailableStations = async () => {
    try {
        const stations = await Station.find({ status: 'Available' }); 
        // console.log("from the function"+ stations);
        return stations;
    } catch (error) {
        throw error;
    }
};



const updateChargerStatus = async (stationId, newStatus) => {
  try {
    const updatedStation = await Station.findByIdAndUpdate(stationId, { status: newStatus }, { new: true });
    return updatedStation;
  } catch (error) {
    throw error;
  }
};


const searchChargers = async (query) => {
  try {
    const regex = new RegExp(query, 'i');

    const stations = await Station.find({
      $or: [
        { title: { $regex: regex } },
        { addressLine1: { $regex: regex } },
        { addressLine2: { $regex: regex } }
      ],
      status: 'Available'
    });

    const onlyTitlesAndLocation = stations.map(station => [station.title, [station.locationLat, station.locationLong]]);

    return onlyTitlesAndLocation ;
  } catch (error) {
    throw error;
  }
};


module.exports = { getAvailableStations,searchChargers };






