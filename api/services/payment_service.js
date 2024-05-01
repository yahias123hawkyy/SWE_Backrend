const Payment = require('../models/payment_model');

async function addPayment(paymentData) {
  const payment = new Payment(paymentData);
  await payment.save();
  return payment;
}

async function getPaymentsByUserId(userId) {
  return await Payment.find({ userId });
}

module.exports = {
  addPayment,
  getPaymentsByUserId,
};
