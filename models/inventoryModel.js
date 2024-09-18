const pool = require('../config/db');

// Crear un registro de inventario para un producto
const createInventory = async (producto_id, cantidad_disponible) => {
  const query = 'INSERT INTO Inventario (producto_id, cantidad_disponible) VALUES ($1, $2) RETURNING *';
  const values = [producto_id, cantidad_disponible];
  const res = await pool.query(query, values);
  return res.rows[0];
};

// Obtener todos los registros de inventario
const getInventories = async () => {
  const query = 'SELECT * FROM Inventario';
  const res = await pool.query(query);
  return res.rows;
};

// Obtener un registro de inventario por ID
const getInventoryById = async (id) => {
  const query = 'SELECT * FROM Inventario WHERE id = $1';
  const res = await pool.query(query, [id]);
  return res.rows[0];
};

// Actualizar el stock disponible de un producto en inventario
const updateInventory = async (id, cantidad_disponible) => {
  const query = 'UPDATE Inventario SET cantidad_disponible = $1 WHERE id = $2 RETURNING *';
  const values = [cantidad_disponible, id];
  const res = await pool.query(query, values);
  return res.rows[0];
};

// Eliminar un registro de inventario
const deleteInventory = async (id) => {
  const query = 'DELETE FROM Inventario WHERE id = $1 RETURNING *';
  const res = await pool.query(query, [id]);
  return res.rows[0];
};

module.exports = { createInventory, getInventories, getInventoryById, updateInventory, deleteInventory };
