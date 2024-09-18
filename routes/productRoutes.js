const express = require('express');
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();

// Ruta para crear un nuevo producto
router.post('/', createProduct);

// Ruta para obtener todos los productos
router.get('/', getProducts);

// Ruta para obtener un producto por ID
router.get('/:id', getProductById);

// Ruta para actualizar un producto
router.put('/:id', updateProduct);

// Ruta para eliminar un producto
router.delete('/:id', deleteProduct);

module.exports = router;
