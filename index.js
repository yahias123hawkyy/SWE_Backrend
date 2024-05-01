
const express = require('express');

const carRoutes = require("./api/routes/car_router")
const StationServicesRouters = require('./api/routes/station_router');
const authRoutes = require('./api/routes/auth_router');
const paymentCardRoutes =require("./api/routes/payment_card_route");
const paymentsRoute= require("./api/routes/payment_router");
const chargingSessionRoutes = require('./api/routes/charging_session_manger'); // Ensure the path matches your file structure



const app = express();
const cors = require('cors');


app.use(cors()); 







const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(cors({
  origin: 'http://10.0.2.2', 
  methods: ['GET', 'POST'], 
  allowedHeaders: ['Content-Type', 'application/json'],
}));




app.use(express.json());


app.use('/api/stations', StationServicesRouters);
app.use('/api/auth', authRoutes);
app.use('/api',carRoutes);
app.use('/api/',paymentCardRoutes);
app.use("/api/",paymentsRoute);
app.use("/api/",chargingSessionRoutes);





module.exports = app;

