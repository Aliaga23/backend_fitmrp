const pool = require('../config/db');

// Registrar un movimiento de producto
const createMovement = async (producto_id, lote_id, tipo_movimiento, cantidad, observaciones) => {
  const query = `
    INSERT INTO MovimientoProducto (producto_id, lote_id, tipo_movimiento, cantidad, observaciones)
    VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const values = [producto_id, lote_id, tipo_movimiento, cantidad, observaciones];
  const res = await pool.query(query, values);
  return res.rows[0];
};

// Obtener todos los movimientos de producto
const getMovements = async () => {
  const query = 'SELECT * FROM MovimientoProducto';
  const res = await pool.query(query);
  return res.rows;
};

// Obtener los movimientos de un producto específico
const getMovementsByProductId = async (producto_id) => {
  const query = 'SELECT * FROM MovimientoProducto WHERE producto_id = $1';
  const res = await pool.query(query, [producto_id]);
  return res.rows;
};

module.exports = { createMovement, getMovements, getMovementsByProductId };
