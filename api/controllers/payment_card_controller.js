// controllers/paymentCardController.js
const paymentCardService = require('../services/payment_card_service');

async function createPaymentCard(req, res) {
  try {
    const card = await paymentCardService.addPaymentCard(req.body);
    res.status(201).json(card);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function listPaymentCards(req, res) {
  try {
    const userId = req.params.userId;
    const cards = await paymentCardService.getPaymentCardsByUserId(userId);
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createPaymentCard,
  listPaymentCards,
};
