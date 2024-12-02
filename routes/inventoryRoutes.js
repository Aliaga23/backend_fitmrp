const express = require('express');
const {
  createInventory,
  updateInventory,
  getInventoryById,
  getInventories,
} = require('../controllers/inventoryController');
const { verifyToken } = require('../middlewares/authMiddleware');
const registrarBitacora = require('../middlewares/bitacoraMiddleware');

const router = express.Router();

// Ruta para crear un nuevo inventario de producto
router.post(
  '/',
  verifyToken,
  registrarBitacora('Creación de un nuevo inventario de producto'),
  createInventory
);

// Ruta para actualizar el stock de un producto (entrada o salida)
router.put(
  '/:producto_id',
  verifyToken,
  registrarBitacora('Actualización del stock de un producto'),
  updateInventory
);

// Ruta para obtener el inventario de un producto específico
router.get(
  '/:producto_id',
  verifyToken,
  registrarBitacora('Consulta del inventario de un producto específico'),
  getInventoryById
);

// Ruta para obtener el inventario de todos los productos
router.get(
  '/',
  verifyToken,
  registrarBitacora('Consulta del inventario de todos los productos'),
  getInventories
);

module.exports = router;
