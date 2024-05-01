const axios = require('axios');


const { Station, Charger, Offer } = require('../models/station_charger_offer_model');
const mongoose = require('mongoose');


const url = 'mongodb://localhost:27017/SWE';



const offersData = [
    { Deadline: '2025-04-30', Name: 'Spring Sale', newPrice: 49.99 },
    { Deadline: '2024-09-15', Name: 'Early Bird Special', newPrice: 59.99 },
    { Deadline: '2023-07-01', Name: 'Memorial Day Offer', newPrice: 39.99 },
    { Deadline: '2024-07-04', Name: 'Independence Day Blast', newPrice: 29.99 },
    { Deadline: '2024-07-15', Name: 'Midsummer Madness', newPrice: 34.99 },
    { Deadline: '2024-08-01', Name: 'Back to School Bonanza', newPrice: 24.99 },
    { Deadline: '2024-08-15', Name: 'Summer Clearance', newPrice: 19.99 },
    { Deadline: '2024-08-25', Name: 'Late Summer Special', newPrice: 44.99 },
    { Deadline: '2024-09-01', Name: 'Labor Day Sale', newPrice: 49.99 },
    { Deadline: '2024-09-10', Name: 'Early Fall Offer', newPrice: 39.99 },
];


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));



const headers = {
    'Authorization': 'Bearer 2a22cace-b846-47ad-a99e-0d93de57a6f4',
    'Content-Type': 'application/json',
    "X-API-Key": "2a22cace-b846-47ad-a99e-0d93de57a6f4",
    "User-Agent": "PostmanRuntime/7.32.1"

};



const fetchChargerDataFromExternalAPI = async (lat, long) => {

    const boundingBoxString = `(${lat + 0.090},${long - 0.127}),(${lat - 0.090},${long + 0.127})`;

    const params = {
        maxresults: 20,
        countrycode: "IT",
        verbose: false,
        compact: true,
        boundingbox: boundingBoxString
    };


    try {
        console.log("my latlong before the call" + lat);

        const response = await axios.get('https://api.openchargemap.io/v3/poi/?output=json', { headers, params });

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching chargers from external API:', error);
        throw error;
    }
};


function getRandomAvailabilty() {
    const strings = ["Available", "UnAvaialble"];
    const randomIndex = Math.floor(Math.random() * strings.length);
    return strings[randomIndex];
}

const fetchAndSaveStations = async (lat, long) => {
    try {
        const stationData = await fetchChargerDataFromExternalAPI(lat, long);



        const savePromises = stationData.map(async stationData => {

            newChargerr = new Charger();




                const chargersList = stationData.Connections.map(async (charger) => {
                    const existingCharger = await Charger.findOne({ "ID": charger.ID });

                    const newCharger = await new Charger({
                        ID: charger.ID,
                        Price: 2 * Math.random() * 1.1,
                        Offers: [offersData[Math.floor(Math.random() * offersData.length)], offersData[Math.floor(Math.random() * offersData.length)], offersData[Math.floor(Math.random() * offersData.length)]],
                        chargerStatus: getRandomAvailabilty(),
                        stationId: stationData.UUID,
                        ConnectionTypeID: charger.ConnectionTypeID,
                        StatusTypeID: charger.LevelID,
                        PowerKW: charger.PowerKW,
                        CurrentTypeID: charger.CurrentTypeID ?? 0,
                        Quantity: charger.Quantity,
                        LevelID: charger.LevelID
                    });

                    if (!existingCharger) {
                        await newCharger.save();
                        newChargerr = newCharger;
                    }



                });


            const existingStation = await Station.findOne({ "ID": stationData.UUID });
            if (!existingStation) {
                const newStation = new Station({
                    ID: stationData.UUID,
                    locationLat: stationData.AddressInfo.Latitude,
                    locationLong: stationData.AddressInfo.Longitude,
                    status: getRandomAvailabilty(),
                    chargers: newChargerr,
                    title: stationData.AddressInfo.Title,
                    addressLine1: stationData.AddressInfo.AddressLine1,
                    addressLine2: stationData.AddressInfo.AddressLine1,
                    town: stationData.AddressInfo.Town ?? "Messina",
                });


                await newStation.save();
                console.log(newStation);
            }
        });

        await Promise.all(savePromises);
        console.log('All chargers have been fetched from the external API and saved.');

        return true;

    } catch (error) {
        console.error('Failed to fetch and save chargers:', error);
    }
};


module.exports = { fetchAndSaveStations };



