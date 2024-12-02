const express = require('express');
const {
  getAll,
  getById,
  getProductsByOrderId,
  createOrdenCompraProducto,
  updateOrdenCompraProducto,
  deleteOrdenCompraProducto,
} = require('../controllers/OrdenCompraProductoController');
const { verifyToken } = require('../middlewares/authMiddleware');
const registrarBitacora = require('../middlewares/bitacoraMiddleware');

const router = express.Router();

// Ruta para obtener todos los registros
router.get(
  '/',
  verifyToken,
  registrarBitacora('Consulta de todos los registros de órdenes de compra-productos'),
  getAll
);

// Ruta para obtener un registro por orden_compra_id y producto_id
router.get(
  '/:orden_compra_id/:producto_id',
  verifyToken,
  registrarBitacora('Consulta de un registro de orden de compra-producto por ID'),
  getById
);

// Ruta para obtener todos los productos por ID de orden de compra
router.get(
  '/:orden_compra_id',
  verifyToken,
  registrarBitacora('Consulta de productos de una orden de compra específica'),
  getProductsByOrderId
);

// Ruta para crear un nuevo registro
router.post(
  '/',
  verifyToken,
  registrarBitacora('Creación de un nuevo registro de orden de compra-producto'),
  createOrdenCompraProducto
);

// Ruta para actualizar un registro por orden_compra_id y producto_id
router.put(
  '/:orden_compra_id/:producto_id',
  verifyToken,
  registrarBitacora('Actualización de un registro de orden de compra-producto'),
  updateOrdenCompraProducto
);

// Ruta para eliminar un registro por orden_compra_id y producto_id
router.delete(
  '/:orden_compra_id/:producto_id',
  verifyToken,
  registrarBitacora('Eliminación de un registro de orden de compra-producto'),
  deleteOrdenCompraProducto
);

module.exports = router;
