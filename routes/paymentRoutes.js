const express = require('express');
const { 
  getPaymentMethods, 
  createPaymentMethod, 
  updatePaymentMethod, 
  deletePaymentMethod 
} = require('../controllers/paymentController');
const { verifyToken } = require('../middlewares/authMiddleware');
const registrarBitacora = require('../middlewares/bitacoraMiddleware');

const router = express.Router();

// Ruta para obtener todos los métodos de pago
router.get(
  '/metodos-pago',
  verifyToken,
  registrarBitacora('Consulta de todos los métodos de pago'),
  getPaymentMethods
);

// Ruta para crear un nuevo método de pago
router.post(
  '/metodos-pago',
  verifyToken,
  registrarBitacora('Creación de un nuevo método de pago'),
  createPaymentMethod
);

// Ruta para actualizar un método de pago existente
router.put(
  '/metodos-pago/:id',
  verifyToken,
  registrarBitacora('Actualización de un método de pago existente'),
  updatePaymentMethod
);

// Ruta para eliminar un método de pago
router.delete(
  '/metodos-pago/:id',
  verifyToken,
  registrarBitacora('Eliminación de un método de pago'),
  deletePaymentMethod
);

module.exports = router;
