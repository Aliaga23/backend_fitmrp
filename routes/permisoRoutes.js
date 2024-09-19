const express = require('express');
const { createPermiso, getPermisos, getPermisoById, updatePermiso, deletePermiso } = require('../controllers/permisoController');
const router = express.Router();

// Ruta para crear un permiso
router.post('/', createPermiso);

// Ruta para obtener todos los permisos
router.get('/', getPermisos);

// Ruta para obtener un permiso por ID
router.get('/:id', getPermisoById);

// Ruta para actualizar un permiso
router.put('/:id', updatePermiso);

// Ruta para eliminar un permiso
router.delete('/:id', deletePermiso);

module.exports = router;
