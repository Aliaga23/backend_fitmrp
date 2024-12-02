const express = require('express');
const {
    createRole,
    getRoles,
    getRoleById,
    updateRole,
    deleteRole,
} = require('../controllers/roleController');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const registrarBitacora = require('../middlewares/bitacoraMiddleware');

// Ruta para crear un rol
router.post(
    '/',
    verifyToken,
    registrarBitacora('Creación de un rol'),
    createRole
);

// Ruta para obtener todos los roles
router.get(
    '/',
    verifyToken,
    registrarBitacora('Consulta de todos los roles'),
    getRoles
);

// Ruta para obtener un rol por ID
router.get(
    '/:id',
    verifyToken,
    registrarBitacora('Consulta de un rol por ID'),
    getRoleById
);

// Ruta para actualizar un rol
router.put(
    '/:id',
    verifyToken,
    registrarBitacora('Actualización de un rol'),
    updateRole
);

// Ruta para eliminar un rol
router.delete(
    '/:id',
    verifyToken,
    registrarBitacora('Eliminación de un rol'),
    deleteRole
);

module.exports = router;
