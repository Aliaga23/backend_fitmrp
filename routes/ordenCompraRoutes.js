const express = require('express');
const {
  createOrdenCompra,
  getOrdenesCompra,
  getOrdenCompraById,
  updateOrdenCompra,
  deleteOrdenCompra,
} = require('../controllers/ordenCompraController');
const { verifyToken } = require('../middlewares/authMiddleware');
const registrarBitacora = require('../middlewares/bitacoraMiddleware');

const router = express.Router();

// Ruta para crear una nueva orden de compra
router.post(
  '/',
  verifyToken,
  registrarBitacora('Creación de una nueva orden de compra'),
  createOrdenCompra
);

// Ruta para obtener todas las órdenes de compra
router.get(
  '/',
  verifyToken,
  registrarBitacora('Consulta de todas las órdenes de compra'),
  getOrdenesCompra
);

// Ruta para obtener una orden de compra específica por ID
router.get(
  '/:id',
  verifyToken,
  registrarBitacora('Consulta de una orden de compra por ID'),
  getOrdenCompraById
);

// Ruta para actualizar una orden de compra por ID
router.put(
  '/:id',
  verifyToken,
  registrarBitacora('Actualización de una orden de compra'),
  updateOrdenCompra
);

// Ruta para eliminar una orden de compra por ID
router.delete(
  '/:id',
  verifyToken,
  registrarBitacora('Eliminación de una orden de compra'),
  deleteOrdenCompra
);

module.exports = router;
