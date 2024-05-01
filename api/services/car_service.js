const Car = require('../models/car_model');

async function createCar(carData) {
  const car = new Car(carData);
  await car.save();
  return car;
}

async function getCarsByUserId(userId) {
  const cars = await Car.find({ userId: userId });
  return cars;
}

module.exports = {
  createCar,
  getCarsByUserId,
};
