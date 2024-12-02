const express = require('express');
const { confirmPayment } = require('../controllers/carritoController');
const { getOrderHistory } = require('../controllers/pedidoController');
const { verifyToken } = require('../middlewares/authMiddleware');
const registrarBitacora = require('../middlewares/bitacoraMiddleware');

const router = express.Router();

// Ruta para confirmar un pago
router.post(
  '/confirm-payment',
  verifyToken,
  registrarBitacora('Confirmación de un pago'),
  confirmPayment
);

// Ruta para obtener el historial de pedidos de un usuario
router.get(
  '/history/:usuario_id',
  verifyToken,
  registrarBitacora('Consulta del historial de pedidos de un usuario'),
  getOrderHistory
);

module.exports = router;
