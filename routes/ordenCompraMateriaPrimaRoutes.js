const express = require('express');
const {
  createOrdenCompraMateriaPrima,
  getOrdenesCompraMateriaPrima,
  getOrdenCompraMateriaPrimaById,
  updateOrdenCompraMateriaPrima,
  deleteOrdenCompraMateriaPrima,
} = require('../controllers/ordenCompraMateriaPrimaController');
const router = express.Router();

// Crear una nueva orden de compra de materia prima
router.post('/', createOrdenCompraMateriaPrima);

// Obtener todas las órdenes de compra de materia prima
router.get('/', getOrdenesCompraMateriaPrima);

// Obtener una orden de compra de materia prima por ID
router.get('/:orden_compra_id/:materia_prima_id', getOrdenCompraMateriaPrimaById);

// Actualizar una orden de compra de materia prima
router.put('/:orden_compra_id/:materia_prima_id', updateOrdenCompraMateriaPrima);

// Eliminar una orden de compra de materia prima
router.delete('/:orden_compra_id/:materia_prima_id', deleteOrdenCompraMateriaPrima);

module.exports = router;
