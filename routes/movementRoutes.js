const express = require('express');
const { createMovement, getMovements, getMovementsByProductId } = require('../controllers/movementController');
const router = express.Router();

// Registrar un movimiento de producto
router.post('/', createMovement);

// Obtener todos los movimientos de productos
router.get('/', getMovements);

// Obtener los movimientos de un producto específico
router.get('/producto/:producto_id', getMovementsByProductId);

module.exports = router;
