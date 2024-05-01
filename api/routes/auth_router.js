// src/api/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { postSignUp, postSignIn, getUserData } = require('../controllers/auth_controller');

router.post('/signup', postSignUp);
router.post('/signin', postSignIn);

router.get('/:id', getUserData);


module.exports = router;
