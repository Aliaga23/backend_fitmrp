// controllers/adminController.js
const pool = require('../config/db');
const { createInvoice } = require('../models/pedidoModel');

// Obtener pedidos pendientes de confirmación
exports.getPendingOrders = async (req, res) => {
    try {
      const query = 'SELECT id, usuario_id, total, estado FROM Pedido WHERE estado = $1';
      const { rows } = await pool.query(query, ['pendiente']);
      res.status(200).json({ orders: rows }); // Aquí devolvemos un objeto con clave 'orders'
    } catch (error) {
      console.error('Error al obtener pedidos pendientes:', error);
      res.status(500).json({ message: 'Error al obtener pedidos pendientes' });
    }
  };
  

// Confirmar el pago de un pedido
exports.confirmPayment = async (req, res) => {
  const { pedido_id } = req.body;
  try {
    const query = 'UPDATE Pedido SET estado = $1 WHERE id = $2 RETURNING *';
    const { rows } = await pool.query(query, ['confirmado', pedido_id]);

    if (rows.length === 0) return res.status(404).json({ message: 'Pedido no encontrado' });

    // Crear la factura después de confirmar el pedido
    const factura = await createInvoice(pedido_id, rows[0].total);
    res.status(200).json({ message: 'Pago confirmado y factura generada', factura });
  } catch (error) {
    console.error('Error al confirmar el pago:', error);
    res.status(500).json({ message: 'Error al confirmar el pago' });
  }
};
