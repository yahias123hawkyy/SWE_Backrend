const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  carType: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    ref: 'User' 
  },
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
