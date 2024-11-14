// routes/adminRoutes.js
const express = require('express');
const { getPendingOrders, confirmPayment } = require('../controllers/adminController');
const router = express.Router();

// Ruta para obtener los pedidos pendientes de confirmación
router.get('/orders/pending', getPendingOrders);

// Ruta para confirmar el pago de un pedido
router.post('/orders/confirm-payment', confirmPayment);

module.exports = router;
