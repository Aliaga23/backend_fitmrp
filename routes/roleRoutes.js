const express = require('express');
const { createRole, getRoles, getRoleById, updateRole, deleteRole } = require('../controllers/roleController');
const router = express.Router();

// Ruta para crear un rol
router.post('/', createRole);

// Ruta para obtener todos los roles
router.get('/', getRoles);

// Ruta para obtener un rol por ID
router.get('/:id', getRoleById);

// Ruta para actualizar un rol
router.put('/:id', updateRole);

// Ruta para eliminar un rol
router.delete('/:id', deleteRole);

module.exports = router;
