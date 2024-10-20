const express = require('express');
const {
  createProveedor,
  getProveedores,
  getProveedorById,
  updateProveedor,
  deleteProveedor,
} = require('../controllers/proveedorController');
const router = express.Router();

// Ruta para crear un nuevo proveedor
router.post('/', createProveedor);

// Ruta para obtener todos los proveedores
router.get('/', getProveedores);

// Ruta para obtener un proveedor por ID
router.get('/:id', getProveedorById);

// Ruta para actualizar un proveedor por ID
router.put('/:id', updateProveedor);

// Ruta para eliminar un proveedor por ID
router.delete('/:id', deleteProveedor);

module.exports = router;
