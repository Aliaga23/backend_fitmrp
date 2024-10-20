const express = require('express');
const {
  createMovementMateriaPrima,
  getMovementsMateriaPrima,
  getMovementsByMateriaPrimaId,
} = require('../controllers/movementMateriaPrimaController');
const router = express.Router();

// Registrar un movimiento de materia prima
router.post('/', createMovementMateriaPrima);

// Obtener todos los movimientos de materia prima
router.get('/', getMovementsMateriaPrima);

// Obtener los movimientos de una materia prima específica
router.get('/materia-prima/:materia_prima_id', getMovementsByMateriaPrimaId);

module.exports = router;
