const { getAvailableStations, searchChargers } = require('../services/station_service');

const { fetchAndSaveStations } = require("../services/external_service")

const listAvailableStations = async (req, res) => {
  try {
    const stations = await getAvailableStations();
    console.log(stations)
    res.json(stations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch available stations', error: error.message });
  }
};


const stationsSender = async (req, res) => {
  try {
    const lat = req.body.lat;
    console.log(req.body);
    const long = req.body.long
    const isDone = await fetchAndSaveStations(lat,long);

    if (isDone) {
      console.log("gett");
      const stations = await getAvailableStations();
      res.status(201).json(stations);
    }
    else {
      res.status(500).json({ message: "failed to send the station to the client", error: error.message });

    }
  } catch (error) {
    res.status(500).json({ message: "failed to send the station to the client", error: error.message });
  }
};




const changeChargerStatusAndNotify = async (req, res, io) => {
  const { statusChange, stationId } = req.body; 

  if (statusChange === 1) { 
    try {
      const updatedStation = await updateChargerStatus(stationId, 'newStatus'); 
      io.emit('chargerStatusChanged', updatedCharger);
      res.json({ success: true, updatedStation });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(400).json({ success: false, message: 'Invalid status change request' });
  }
};

const getSearchResults = async (req, res) => {
  const query = req.query.q; 
  try {
    const results = await searchChargers(query);
    console.log(results);
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: "Error searching chargers", error: error.message });
  }
};





module.exports = { listAvailableStations, getSearchResults, stationsSender };




