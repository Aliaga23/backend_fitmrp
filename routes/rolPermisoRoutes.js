const express = require('express');
const { addRolPermiso, getAllRolPermisos, getPermisosByRolId, deleteRolPermiso } = require('../controllers/rolpermisoController');
const router = express.Router();

// Ruta para asignar un permiso a un rol
router.post('/', addRolPermiso);

// Ruta para obtener todas las relaciones rol-permiso
router.get('/', getAllRolPermisos);

// Ruta para obtener permisos por rol ID
router.get('/:rol_id', getPermisosByRolId);

// Ruta para eliminar una relación rol-permiso
router.delete('/', deleteRolPermiso);

module.exports = router;
