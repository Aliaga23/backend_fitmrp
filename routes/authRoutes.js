const express = require('express');
const router = express.Router();
const { loginUser, signUpUser } = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Ruta para login
router.post('/login', loginUser);

// Ruta para registro (Sign Up)
router.post('/signup', signUpUser);

// Ruta protegida para probar el middleware (requiere autenticación)
router.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({ message: `Bienvenido ${req.user.email}, tienes acceso` });
});

module.exports = router;
