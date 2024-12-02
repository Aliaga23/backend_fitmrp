const express = require('express');
const {
  createMovement,
  getMovements,
  getMovementsByProductId,
} = require('../controllers/movementController');
const { verifyToken } = require('../middlewares/authMiddleware');
const registrarBitacora = require('../middlewares/bitacoraMiddleware');

const router = express.Router();

// Registrar un movimiento de producto
router.post(
  '/',
  verifyToken,
  registrarBitacora('Registro de un movimiento de producto'),
  createMovement
);

// Obtener todos los movimientos de productos
router.get(
  '/',
  verifyToken,
  registrarBitacora('Consulta de todos los movimientos de productos'),
  getMovements
);

// Obtener los movimientos de un producto específico
router.get(
  '/producto/:producto_id',
  verifyToken,
  registrarBitacora('Consulta de movimientos de un producto específico'),
  getMovementsByProductId
);

module.exports = router;
