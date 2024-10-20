const express = require('express');
const {
  createInventarioMateriaPrima,
  updateInventarioMateriaPrima,
  getInventarioMateriaPrimaById,
  getInventarioMateriasPrimas,
} = require('../controllers/inventarioMateriaPrimaController');
const router = express.Router();

// Ruta para crear un nuevo inventario de materia prima
router.post('/', createInventarioMateriaPrima);

// Ruta para actualizar el stock de una materia prima (entrada o salida)
router.put('/:materia_prima_id', updateInventarioMateriaPrima);

// Ruta para obtener el inventario de una materia prima específica
router.get('/:materia_prima_id', getInventarioMateriaPrimaById);

// Ruta para obtener el inventario de todas las materias primas
router.get('/', getInventarioMateriasPrimas);

module.exports = router;
