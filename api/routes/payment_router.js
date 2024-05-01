// routes/paymentRoutes.js
const express = require('express');
const paymentController = require('../controllers/payment_controller');
const router = express.Router();




router.post('/payments', paymentController.createPayment);
router.get('/payments/user/:userId', paymentController.listPayments);

module.exports = router;
