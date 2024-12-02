const express = require('express');
const { 
  createPermiso, 
  getPermisos, 
  getPermisoById, 
  updatePermiso, 
  deletePermiso 
} = require('../controllers/permisoController');
const { verifyToken } = require('../middlewares/authMiddleware');
const registrarBitacora = require('../middlewares/bitacoraMiddleware');

const router = express.Router();

// Ruta para crear un permiso
router.post(
  '/',
  verifyToken,
  registrarBitacora('Creación de un permiso'),
  createPermiso
);

// Ruta para obtener todos los permisos
router.get(
  '/',
  verifyToken,
  registrarBitacora('Consulta de todos los permisos'),
  getPermisos
);

// Ruta para obtener un permiso por ID
router.get(
  '/:id',
  verifyToken,
  registrarBitacora('Consulta de un permiso por ID'),
  getPermisoById
);

// Ruta para actualizar un permiso
router.put(
  '/:id',
  verifyToken,
  registrarBitacora('Actualización de un permiso'),
  updatePermiso
);

// Ruta para eliminar un permiso
router.delete(
  '/:id',
  verifyToken,
  registrarBitacora('Eliminación de un permiso'),
  deletePermiso
);

module.exports = router;
