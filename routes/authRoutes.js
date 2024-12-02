const express = require('express');
const router = express.Router();
const { loginUser, signUpUser } = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware');
const registrarBitacora = require('../middlewares/bitacoraMiddleware');

// Ruta para login
router.post(
    '/login',
    registrarBitacora('Inicio de sesión de un usuario'), // Registra el intento de inicio de sesión
    loginUser
);

// Ruta para registro (Sign Up)
router.post(
    '/signup',
    verifyToken, // Protegida: Solo usuarios autenticados pueden registrar nuevos usuarios
    registrarBitacora('Registro de un nuevo usuario'),
    signUpUser
);

// Ruta protegida para probar el middleware
router.get(
    '/protected',
    verifyToken, // Protegida: Requiere autenticación
    registrarBitacora('Acceso a ruta protegida'),
    (req, res) => {
        res.status(200).json({ message: `Bienvenido ${req.user.email}, tienes acceso` });
    }
);

module.exports = router;
