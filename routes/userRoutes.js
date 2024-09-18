const express = require('express');
const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const router = express.Router();

// Ruta para crear un usuario
router.post('/', createUser);

// Ruta para obtener todos los usuarios
router.get('/', getUsers);

// Ruta para obtener un usuario por ID
router.get('/:id', getUserById);

// Ruta para actualizar un usuario
router.put('/:id', updateUser);

// Ruta para eliminar un usuario
router.delete('/:id', deleteUser);

module.exports = router;
