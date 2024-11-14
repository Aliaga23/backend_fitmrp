const express = require('express');
const {
  getCartItemCount,
  getOrCreateCart,
  addItemToCart,
  updateCartItem,
  removeItemFromCart,
  checkout // Importamos la función de checkout
} = require('../controllers/carritoController');
const router = express.Router();

router.get('/items-count/:usuario_id', getCartItemCount);

// Ruta para obtener o crear el carrito de un usuario
router.post('/get-or-create', getOrCreateCart);

// Ruta para añadir un producto al carrito
router.post('/add-item', addItemToCart);

// Ruta para actualizar la cantidad de un producto en el carrito
router.put('/update-item', updateCartItem);

// Ruta para eliminar un producto del carrito
router.delete('/remove-item', removeItemFromCart);



// Ruta para realizar el checkout
router.post('/checkout', checkout);

module.exports = router;
