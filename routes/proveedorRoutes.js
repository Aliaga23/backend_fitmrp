const express = require('express');
const {
  createProveedor,
  getProveedores,
  getProveedorById,
  updateProveedor,
  deleteProveedor,
} = require('../controllers/proveedorController');
const { verifyToken } = require('../middlewares/authMiddleware');
const registrarBitacora = require('../middlewares/bitacoraMiddleware');

const router = express.Router();

// Ruta para crear un nuevo proveedor
router.post(
  '/',
  verifyToken,
  registrarBitacora('Creación de un nuevo proveedor'),
  createProveedor
);

// Ruta para obtener todos los proveedores
router.get(
  '/',
  verifyToken,
  registrarBitacora('Consulta de todos los proveedores'),
  getProveedores
);

// Ruta para obtener un proveedor por ID
router.get(
  '/:id',
  verifyToken,
  registrarBitacora('Consulta de un proveedor por ID'),
  getProveedorById
);

// Ruta para actualizar un proveedor por ID
router.put(
  '/:id',
  verifyToken,
  registrarBitacora('Actualización de un proveedor'),
  updateProveedor
);

// Ruta para eliminar un proveedor por ID
router.delete(
  '/:id',
  verifyToken,
  registrarBitacora('Eliminación de un proveedor'),
  deleteProveedor
);

module.exports = router;
