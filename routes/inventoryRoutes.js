const express = require('express');
const {
  createInventory,
  updateInventory,
  getInventoryById,
  getInventories,
} = require('../controllers/inventoryController');
const router = express.Router();

// Ruta para crear un nuevo inventario de producto
router.post('/', createInventory);

// Ruta para actualizar el stock de un producto (entrada o salida)
router.put('/:producto_id', updateInventory);

// Ruta para obtener el inventario de un producto específico
router.get('/:producto_id', getInventoryById);

// Ruta para obtener el inventario de todos los productos
router.get('/', getInventories);

module.exports = router;
