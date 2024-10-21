// routes/ordenCompraProductoRoutes.js
const express = require('express');
const {
  getAll,
  getById,
  getProductsByOrderId,
  createOrdenCompraProducto,
  updateOrdenCompraProducto,
  deleteOrdenCompraProducto,
} = require('../controllers/OrdenCompraProductoController');
const router = express.Router();

// Ruta para obtener todos los registros
router.get('/', getAll);

// Ruta para obtener un registro por orden_compra_id y producto_id
router.get('/:orden_compra_id/:producto_id', getById);

// Ruta para obtener todos los productos por ID de orden de compra
router.get('/order/:orden_compra_id', getProductsByOrderId);

// Ruta para crear un nuevo registro
router.post('/', createOrdenCompraProducto);

// Ruta para actualizar un registro por orden_compra_id y producto_id
router.put('/:orden_compra_id/:producto_id', updateOrdenCompraProducto);

// Ruta para eliminar un registro por orden_compra_id y producto_id
router.delete('/:orden_compra_id/:producto_id', deleteOrdenCompraProducto);

module.exports = router;
