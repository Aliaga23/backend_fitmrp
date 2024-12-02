const express = require('express');
const {
  getCartItemCount,
  getOrCreateCart,
  addItemToCart,
  updateCartItem,
  removeItemFromCart,
  checkout,
} = require('../controllers/carritoController');
const { verifyToken } = require('../middlewares/authMiddleware');
const registrarBitacora = require('../middlewares/bitacoraMiddleware');

const router = express.Router();

// Ruta para obtener la cantidad de ítems en el carrito
router.get(
  '/items-count/:usuario_id',
  verifyToken,
  registrarBitacora('Consulta de cantidad de ítems en el carrito'),
  getCartItemCount
);

// Ruta para obtener o crear el carrito de un usuario
router.post(
  '/get-or-create',
  verifyToken,
  registrarBitacora('Obtener o crear un carrito'),
  getOrCreateCart
);

// Ruta para añadir un producto al carrito
router.post(
  '/add-item',
  verifyToken,
  registrarBitacora('Añadir un producto al carrito'),
  addItemToCart
);

// Ruta para actualizar la cantidad de un producto en el carrito
router.put(
  '/update-item',
  verifyToken,
  registrarBitacora('Actualizar cantidad de un producto en el carrito'),
  updateCartItem
);

// Ruta para eliminar un producto del carrito
router.delete(
  '/remove-item',
  verifyToken,
  registrarBitacora('Eliminar un producto del carrito'),
  removeItemFromCart
);

// Ruta para realizar el checkout
router.post(
  '/checkout',
  verifyToken,
  registrarBitacora('Realizar checkout del carrito'),
  checkout
);

module.exports = router;
