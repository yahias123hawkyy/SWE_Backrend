// services/paymentCardService.js
const PaymentCard = require('../models/payment_card_model');

async function addPaymentCard(cardData) {
  const card = new PaymentCard(cardData);
  await card.save();
  return card;
}

async function getPaymentCardsByUserId(userId) {
  return await PaymentCard.find({ userId });
}

module.exports = {
  addPaymentCard,
  getPaymentCardsByUserId,
};
