const express = require('express');
const {
  createOrdenCompraMateriaPrima,
  getOrdenesCompraMateriaPrima,
  getOrdenCompraMateriaPrimaById,
  updateOrdenCompraMateriaPrima,
  deleteOrdenCompraMateriaPrima,
} = require('../controllers/ordenCompraMateriaPrimaController');
const { verifyToken } = require('../middlewares/authMiddleware');
const registrarBitacora = require('../middlewares/bitacoraMiddleware');

const router = express.Router();

// Crear una nueva orden de compra de materia prima
router.post(
  '/',
  verifyToken,
  registrarBitacora('Creación de una nueva orden de compra de materia prima'),
  createOrdenCompraMateriaPrima
);

// Obtener todas las órdenes de compra de materia prima
router.get(
  '/',
  verifyToken,
  registrarBitacora('Consulta de todas las órdenes de compra de materia prima'),
  getOrdenesCompraMateriaPrima
);

// Obtener una orden de compra de materia prima por ID
router.get(
  '/:orden_compra_id/:materia_prima_id',
  verifyToken,
  registrarBitacora('Consulta de una orden de compra de materia prima por ID'),
  getOrdenCompraMateriaPrimaById
);

// Actualizar una orden de compra de materia prima
router.put(
  '/:orden_compra_id/:materia_prima_id',
  verifyToken,
  registrarBitacora('Actualización de una orden de compra de materia prima'),
  updateOrdenCompraMateriaPrima
);

// Eliminar una orden de compra de materia prima
router.delete(
  '/:orden_compra_id/:materia_prima_id',
  verifyToken,
  registrarBitacora('Eliminación de una orden de compra de materia prima'),
  deleteOrdenCompraMateriaPrima
);

module.exports = router;
