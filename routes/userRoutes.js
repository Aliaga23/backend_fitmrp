const express = require('express');
const { 
  createUser, 
  getUsers, 
  getUserById, 
  updateUser, 
  deleteUser 
} = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');
const registrarBitacora = require('../middlewares/bitacoraMiddleware');

const router = express.Router();

// Ruta para crear un usuario
router.post(
  '/',
  verifyToken,
  registrarBitacora('Creación de un usuario'),
  createUser
);

// Ruta para obtener todos los usuarios
router.get(
  '/',
  verifyToken,
  registrarBitacora('Consulta de todos los usuarios'),
  getUsers
);

// Ruta para obtener un usuario por ID
router.get(
  '/:id',
  verifyToken,
  registrarBitacora('Consulta de un usuario por ID'),
  getUserById
);

// Ruta para actualizar un usuario
router.put(
  '/:id',
  verifyToken,
  registrarBitacora('Actualización de un usuario'),
  updateUser
);

// Ruta para eliminar un usuario
router.delete(
  '/:id',
  verifyToken,
  registrarBitacora('Eliminación de un usuario'),
  deleteUser
);

module.exports = router;
