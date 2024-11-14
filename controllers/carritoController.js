const {
  createCart,
  getActiveCartByUserId,
  addItemToCart,
  getCartItems,
  updateCartItem,
  removeItemFromCart,
  completeCart,
  countItemsInCart
} = require('../models/carritoModel');
const { createOrder, confirmOrderPayment, addProductsToOrderAndUpdateInventory, createInvoice } = require('../models/pedidoModel');

const pool = require('../config/db');

exports.getOrCreateCart = async (req, res) => {
  const { usuario_id } = req.body;

  try {
    let cart = await getActiveCartByUserId(usuario_id);

    // Si no existe un carrito activo, crearlo
    if (!cart) {
      cart = await createCart(usuario_id);
    }

    // Obtener los productos en el carrito
    const items = await getCartItems(cart.id);
    res.status(200).json({ ...cart, items });
  } catch (error) {
    console.error('Error en getOrCreateCart:', error);
    res.status(500).json({ message: 'Error al obtener o crear el carrito' });
  }
};

// Añadir producto al carrito
exports.addItemToCart = async (req, res) => {
  const { usuario_id, producto_id, cantidad } = req.body;

  try {
    let cart = await getActiveCartByUserId(usuario_id);
    
    if (!cart) {
      cart = await createCart(usuario_id);
    }

    const cartItem = await addItemToCart(cart.id, producto_id, cantidad);
    res.status(200).json(cartItem);
  } catch (error) {
    console.error('Error en addItemToCart:', error);
    res.status(500).json({ message: 'Error al añadir producto al carrito' });
  }
};

// Actualizar la cantidad de un producto en el carrito
exports.updateCartItem = async (req, res) => {
  const { usuario_id, producto_id, cantidad } = req.body;

  try {
    const cart = await getActiveCartByUserId(usuario_id);

    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    const updatedItem = await updateCartItem(cart.id, producto_id, cantidad);
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Error en updateCartItem:', error);
    res.status(500).json({ message: 'Error al actualizar el producto en el carrito' });
  }
};

// Eliminar un producto del carrito
exports.removeItemFromCart = async (req, res) => {
  const { usuario_id, producto_id } = req.body;

  try {
    const cart = await getActiveCartByUserId(usuario_id);

    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    const removedItem = await removeItemFromCart(cart.id, producto_id);
    res.status(200).json(removedItem);
  } catch (error) {
    console.error('Error en removeItemFromCart:', error);
    res.status(500).json({ message: 'Error al eliminar el producto del carrito' });
  }
};

// checkout: Usuario inicia el proceso de pago
exports.checkout = async (req, res) => {
  const { usuario_id, metodo_pago } = req.body;
  try {
    const cart = await getActiveCartByUserId(usuario_id);
    if (!cart) return res.status(400).json({ message: "Carrito no encontrado." });

    const items = await getCartItems(cart.id);
    const total = items.reduce((acc, item) => acc + item.precio_unitario * item.cantidad, 0);

    // Crear el pedido
    const pedido = await createOrder(usuario_id, total);
    await addProductsToOrderAndUpdateInventory(pedido.id, items);
    
    // Completar el carrito
    await completeCart(cart.id);

    res.status(200).json({ message: "Pago en proceso, esperando confirmación", pedidoId: pedido.id });
  } catch (error) {
    console.error("Error en el proceso de pago:", error);
    res.status(500).json({ message: "Error al procesar el pago" });
  }
};

// confirmPayment: Confirmación de pago por el administrador
exports.confirmPayment = async (req, res) => {
  const { pedido_id } = req.body;
  try {
    // Confirmar el pago del pedido
    const pedido = await confirmOrderPayment(pedido_id);
    if (!pedido) return res.status(404).json({ message: 'Pedido no encontrado' });

    // Generar la factura después de la confirmación del pago
    const factura = await createInvoice(pedido.id, pedido.total);
    res.status(200).json({ message: "Pago confirmado y factura generada", factura });
  } catch (error) {
    console.error("Error al confirmar el pago:", error);
    res.status(500).json({ message: "Error al confirmar el pago" });
  }
};

// Obtener el conteo de productos en el carrito de un usuario
exports.getCartItemCount = async (req, res) => {
  const { usuario_id } = req.params;

  try {
    const count = await countItemsInCart(usuario_id);
    res.status(200).json({ count });
  } catch (error) {
    console.error('Error al obtener el conteo de productos en el carrito:', error);
    res.status(500).json({ message: 'Error al obtener el conteo de productos en el carrito' });
  }
};
