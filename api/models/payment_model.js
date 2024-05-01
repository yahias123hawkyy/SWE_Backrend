// models/Payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    stationName: {
        type: String,
        required: true,
    },
    chargerId: {
        type: Number,
        required: true,
    },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
