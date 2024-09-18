const express = require('express');
const { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } = require('../controllers/categoryController');
const router = express.Router();

// Ruta para crear una nueva categoría
router.post('/', createCategory);

// Ruta para obtener todas las categorías
router.get('/', getCategories);

// Ruta para obtener una categoría por ID
router.get('/:id', getCategoryById);

// Ruta para actualizar una categoría por ID
router.put('/:id', updateCategory);

// Ruta para eliminar una categoría por ID
router.delete('/:id', deleteCategory);

module.exports = router;
