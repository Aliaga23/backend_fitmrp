const express = require('express');
const {
  createOrdenCompra,
  getOrdenesCompra,
  getOrdenCompraById,
  updateOrdenCompra,
  deleteOrdenCompra,
} = require('../controllers/ordenCompraController');
const router = express.Router();

// Ruta para crear una nueva orden de compra
router.post('/', createOrdenCompra);

// Ruta para obtener todas las órdenes de compra
router.get('/', getOrdenesCompra);

// Ruta para obtener una orden de compra específica por ID
router.get('/:id', getOrdenCompraById);

// Ruta para actualizar una orden de compra por ID
router.put('/:id', updateOrdenCompra);

// Ruta para eliminar una orden de compra por ID
router.delete('/:id', deleteOrdenCompra);

module.exports = router;
