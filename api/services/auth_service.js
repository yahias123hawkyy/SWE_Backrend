const User = require('../models/auth_model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'yahiaaywaba2a'; 

async function signUp(userData) {
  const user = new User(userData);
  await user.save();
  return [generateToken(user._id),user._id];
}

async function signIn(username, password) {
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }
  return [generateToken(user._id),user._id];
}

function generateToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' }); 
}


const getUserById = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  };

module.exports = { signUp, signIn, getUserById };
