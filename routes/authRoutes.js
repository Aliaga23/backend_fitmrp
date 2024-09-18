// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { loginUser, signUpUser } = require('../controllers/authController');

// Ruta para login
router.post('/login', loginUser);

// Ruta para registro (Sign Up)
router.post('/signup', signUpUser);

module.exports = router;
