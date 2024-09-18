const pool = require('../config/db');

// Crear un nuevo lote
const createLot = async (producto_id, numero_lote, fecha_vencimiento) => {
  const query = 'INSERT INTO Lote (producto_id, numero_lote, fecha_vencimiento) VALUES ($1, $2, $3) RETURNING *';
  const values = [producto_id, numero_lote, fecha_vencimiento];
  const res = await pool.query(query, values);
  return res.rows[0];
};

// Obtener todos los lotes
const getLots = async () => {
  const query = 'SELECT * FROM Lote';
  const res = await pool.query(query);
  return res.rows;
};

// Obtener un lote por ID
const getLotById = async (id) => {
  const query = 'SELECT * FROM Lote WHERE id = $1';
  const res = await pool.query(query, [id]);
  return res.rows[0];
};

// Actualizar un lote
const updateLot = async (id, numero_lote, fecha_vencimiento) => {
  const query = 'UPDATE Lote SET numero_lote = $1, fecha_vencimiento = $2 WHERE id = $3 RETURNING *';
  const values = [numero_lote, fecha_vencimiento, id];
  const res = await pool.query(query, values);
  return res.rows[0];
};

// Eliminar un lote
const deleteLot = async (id) => {
  const query = 'DELETE FROM Lote WHERE id = $1 RETURNING *';
  const res = await pool.query(query, [id]);
  return res.rows[0];
};

module.exports = { createLot, getLots, getLotById, updateLot, deleteLot };
