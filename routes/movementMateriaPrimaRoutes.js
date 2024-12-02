const express = require('express');
const {
  createMovementMateriaPrima,
  getMovementsMateriaPrima,
  getMovementsByMateriaPrimaId,
} = require('../controllers/movementMateriaPrimaController');
const { verifyToken } = require('../middlewares/authMiddleware');
const registrarBitacora = require('../middlewares/bitacoraMiddleware');

const router = express.Router();

// Registrar un movimiento de materia prima
router.post(
  '/',
  verifyToken,
  registrarBitacora('Registro de un movimiento de materia prima'),
  createMovementMateriaPrima
);

// Obtener todos los movimientos de materia prima
router.get(
  '/',
  verifyToken,
  registrarBitacora('Consulta de todos los movimientos de materia prima'),
  getMovementsMateriaPrima
);

// Obtener los movimientos de una materia prima específica
router.get(
  '/materia-prima/:materia_prima_id',
  verifyToken,
  registrarBitacora('Consulta de movimientos de una materia prima específica'),
  getMovementsByMateriaPrimaId
);

module.exports = router;
