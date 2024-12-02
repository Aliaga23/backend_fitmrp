const express = require('express');
const { 
  createProduct, 
  getProducts, 
  getProductById, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController');
const { verifyToken } = require('../middlewares/authMiddleware');
const registrarBitacora = require('../middlewares/bitacoraMiddleware');

const router = express.Router();

// Ruta para crear un nuevo producto
router.post(
  '/',
  verifyToken,
  registrarBitacora('Creación de un nuevo producto'),
  createProduct
);

// Ruta para obtener todos los productos
router.get(
  '/',
  verifyToken,
  registrarBitacora('Consulta de todos los productos'),
  getProducts
);

// Ruta para obtener un producto por ID
router.get(
  '/:id',
  verifyToken,
  registrarBitacora('Consulta de un producto por ID'),
  getProductById
);

// Ruta para actualizar un producto
router.put(
  '/:id',
  verifyToken,
  registrarBitacora('Actualización de un producto'),
  updateProduct
);

// Ruta para eliminar un producto
router.delete(
  '/:id',
  verifyToken,
  registrarBitacora('Eliminación de un producto'),
  deleteProduct
);

module.exports = router;
