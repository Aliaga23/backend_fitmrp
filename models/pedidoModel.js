const pool = require('../config/db');

// Crear un nuevo pedido
const createOrder = async (usuario_id, total) => {
  const query = `INSERT INTO Pedido (usuario_id, fecha, estado, total) VALUES ($1, NOW(), 'pendiente', $2) RETURNING *`;
  const values = [usuario_id, total];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

// Confirmar el pago del pedido (para el administrador)
const confirmOrderPayment = async (pedido_id) => {
  const query = `UPDATE Pedido SET estado = 'confirmado' WHERE id = $1 RETURNING *`;
  const { rows } = await pool.query(query, [pedido_id]);
  return rows[0];
};

// Añadir productos al pedido y actualizar el inventario
const addProductsToOrderAndUpdateInventory = async (pedido_id, items) => {
  for (const item of items) {
    await pool.query(
      'INSERT INTO PedidoProducto (pedido_id, producto_id, cantidad, precio_unitario) VALUES ($1, $2, $3, $4)',
      [pedido_id, item.producto_id, item.cantidad, item.precio_unitario]
    );
    await pool.query(
      'UPDATE Inventario SET cantidad_disponible = cantidad_disponible - $1 WHERE producto_id = $2',
      [item.cantidad, item.producto_id]
    );
  }
};

// Crear una factura para el pedido confirmado
const createInvoice = async (pedido_id, total) => {
  const query = `INSERT INTO Factura (pedido_id, fecha, total) VALUES ($1, NOW(), $2) RETURNING *`;
  const { rows } = await pool.query(query, [pedido_id, total]);
  return rows[0];
};

module.exports = {
  createOrder,
  confirmOrderPayment,
  addProductsToOrderAndUpdateInventory,
  createInvoice
};
