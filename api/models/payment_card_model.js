// models/PaymentCard.js
const mongoose = require('mongoose');

const paymentCardSchema = new mongoose.Schema({
  cardNumber: { type: String, required: true },
  expirationDate: { type: String, required: true }, // Format: MM/YY
  cardholderName: { type: String, required: true },
  cvv: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const PaymentCard = mongoose.model('PaymentCard', paymentCardSchema);

module.exports = PaymentCard;
