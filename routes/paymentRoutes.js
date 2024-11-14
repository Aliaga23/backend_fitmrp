// archivo: routes/paymentRoutes.js

const express = require('express');
const { 
  getPaymentMethods, 
  createPaymentMethod, 
  updatePaymentMethod, 
  deletePaymentMethod 
} = require('../controllers/paymentController');
const router = express.Router();

// Ruta para obtener todos los métodos de pago
router.get('/metodos-pago', getPaymentMethods);

// Ruta para crear un nuevo método de pago
router.post('/metodos-pago', createPaymentMethod);

// Ruta para actualizar un método de pago existente
router.put('/metodos-pago/:id', updatePaymentMethod);

// Ruta para eliminar un método de pago
router.delete('/metodos-pago/:id', deletePaymentMethod);

module.exports = router;
