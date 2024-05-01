// routes/paymentCardRoutes.js
const express = require('express');
const router = express.Router();
const paymentCardController = require('../controllers/payment_card_controller');

router.post('/paymentCards', paymentCardController.createPaymentCard);
router.get('/paymentCards/user/:userId', paymentCardController.listPaymentCards);

module.exports = router;
