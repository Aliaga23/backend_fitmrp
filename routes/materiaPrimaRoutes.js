const express = require('express');
const {
  createMateriaPrima,
  getMateriasPrimas,
  getMateriaPrimaById,
  updateMateriaPrima,
  deleteMateriaPrima,
} = require('../controllers/materiaPrimaController');
const router = express.Router();

// Ruta para crear una nueva materia prima
router.post('/', createMateriaPrima);

// Ruta para obtener todas las materias primas
router.get('/', getMateriasPrimas);

// Ruta para obtener una materia prima por ID
router.get('/:id', getMateriaPrimaById);

// Ruta para actualizar una materia prima por ID
router.put('/:id', updateMateriaPrima);

// Ruta para eliminar una materia prima por ID
router.delete('/:id', deleteMateriaPrima);

module.exports = router;
