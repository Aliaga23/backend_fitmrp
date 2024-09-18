const express = require('express');
const { createInventory, getInventories, getInventoryById, updateInventory, deleteInventory } = require('../controllers/inventoryController');
const router = express.Router();

// Ruta para crear un registro de inventario
router.post('/', createInventory);

// Ruta para obtener todos los registros de inventario
router.get('/', getInventories);

// Ruta para obtener un registro de inventario por ID
router.get('/:id', getInventoryById);

// Ruta para actualizar un registro de inventario
router.put('/:id', updateInventory);

// Ruta para eliminar un registro de inventario
router.delete('/:id', deleteInventory);

module.exports = router;
