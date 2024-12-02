const express = require('express');
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const registrarBitacora = require('../middlewares/bitacoraMiddleware');

// Ruta para crear una nueva categoría
router.post(
  '/',
  verifyToken,
  registrarBitacora('Creación de una categoría'),
  createCategory
);

// Ruta para obtener todas las categorías
router.get(
  '/',
  verifyToken,
  registrarBitacora('Consulta de todas las categorías'),
  getCategories
);

// Ruta para obtener una categoría por ID
router.get(
  '/:id',
  verifyToken,
  registrarBitacora('Consulta de una categoría por ID'),
  getCategoryById
);

// Ruta para actualizar una categoría por ID
router.put(
  '/:id',
  verifyToken,
  registrarBitacora('Actualización de una categoría'),
  updateCategory
);

// Ruta para eliminar una categoría por ID
router.delete(
  '/:id',
  verifyToken,
  registrarBitacora('Eliminación de una categoría'),
  deleteCategory
);

module.exports = router;
