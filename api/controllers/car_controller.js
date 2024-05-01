const carService = require('../services/car_service');

async function addCar(req, res) {
  try {
    const car = await carService.createCar(req.body);
    res.status(201).json(car);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function listCarsByUser(req, res) {
  try {
    const userId = req.params.userId; 
    const cars = await carService.getCarsByUserId(userId);
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  addCar,
  listCarsByUser
};