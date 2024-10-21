const express = require('express');
const {
  createOrdenCompraMateriaPrima,
  getOrdenesCompraMateriaPrima,
  getOrdenCompraMateriaPrimaById,
  updateOrdenCompraMateriaPrima,
  deleteOrdenCompraMateriaPrima,
} = require('../controllers/ordenCompraMateriaPrimaController');
const router = express.Router();

// Ruta para crear una nueva orden de compra de materia prima
router.post('/', createOrdenCompraMateriaPrima);

// Ruta para obtener todas las órdenes de compra de materia prima
router.get('/', getOrdenesCompraMateriaPrima);

// Ruta para obtener una orden de compra de materia prima por ID
router.get('/:orden_compra_id/:materia_prima_id', getOrdenCompraMateriaPrimaById);

// Ruta para actualizar una orden de compra de materia prima
router.put('/:orden_compra_id/:materia_prima_id', updateOrdenCompraMateriaPrima);

// Ruta para eliminar una orden de compra de materia prima
router.delete('/:orden_compra_id/:materia_prima_id', deleteOrdenCompraMateriaPrima);

module.exports = router;
