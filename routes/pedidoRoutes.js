const express = require('express');
const { confirmPayment } = require('../controllers/carritoController');
const router = express.Router();
const { getOrderHistory } = require('../controllers/pedidoController');

router.post('/confirm-payment', confirmPayment);
router.get('/history/:usuario_id', getOrderHistory);

module.exports = router;
