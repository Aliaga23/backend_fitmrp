const express = require('express');
const { createStripePayment, confirmStripePayment } = require('../controllers/pagoController');
const router = express.Router();

// Crear un pago con Stripe
router.post('/stripe/create-payment', createStripePayment);

// Confirmar el pago de Stripe y generar el pedido
router.post('/stripe/verify-payment', confirmStripePayment);

module.exports = router;
