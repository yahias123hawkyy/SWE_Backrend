// controllers/paymentController.js
const paymentService = require('../services/payment_service');

async function createPayment(req, res) {
  try {
    const payment = await paymentService.addPayment(req.body);
    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function listPayments(req, res) {
  try {
    const userId = req.params.userId;
    const payments = await paymentService.getPaymentsByUserId(userId);
    res.status(201).json(payments);
}
catch(err){
    res.status(500).json({ message: error.message }); 
}
}

module.exports={
    createPayment,
    listPayments
}
