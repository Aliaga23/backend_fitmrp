const { addProductsToOrder, createInvoice } = require('../models/pedidoModel');
const { completeCart } = require('../models/carritoModel');
const pool = require('../config/db');

exports.confirmPayment = async (req, res) => {
  const { pedido_id, items, total } = req.body;
  try {
    await addProductsToOrder(pedido_id, items);
    const invoice = await createInvoice(pedido_id, total);
    await completeCart(pedido_id);  // Cambiar estado del carrito
    res.status(200).json({ message: 'Pago confirmado y factura emitida', invoice });
  } catch (error) {
    res.status(500).json({ message: 'Error al confirmar el pago' });
  }
};
// Obtener historial de pedidos del usuario
exports.getOrderHistory = async (req, res) => {
  const { usuario_id } = req.params;

  try {
    // Obtener los pedidos del usuario con estado y total
    const pedidosQuery = `
      SELECT id, fecha, estado, total
      FROM Pedido
      WHERE usuario_id = $1
      ORDER BY fecha DESC
    `;
    const { rows: pedidos } = await pool.query(pedidosQuery, [usuario_id]);

    // Obtener los productos de cada pedido y asociarlos al pedido correspondiente
    for (const pedido of pedidos) {
      const itemsQuery = `
        SELECT pp.producto_id, p.nombre, pp.cantidad, pp.precio_unitario
        FROM PedidoProducto pp
        JOIN Producto p ON pp.producto_id = p.id
        WHERE pp.pedido_id = $1
      `;
      const { rows: items } = await pool.query(itemsQuery, [pedido.id]);
      pedido.items = items; // Añadir productos a cada pedido
    }

    res.status(200).json({ orders: pedidos });
  } catch (error) {
    console.error('Error al obtener el historial de pedidos:', error);
    res.status(500).json({ message: 'Error al obtener el historial de pedidos' });
  }
};