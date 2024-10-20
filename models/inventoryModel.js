const pool = require('../config/db');

// Crear un nuevo registro de inventario para un producto
const createInventory = async (producto_id, cantidad_disponible) => {
  const query = `
    INSERT INTO Inventario (producto_id, cantidad_disponible)
    VALUES ($1, $2) RETURNING *`;
  const values = [producto_id, cantidad_disponible];
  const res = await pool.query(query, values);
  return res.rows[0];
};

// Actualizar el stock de un producto (entrada o salida)
const updateInventory = async (producto_id, cantidad, esEntrada) => {
  const query = esEntrada
    ? `UPDATE Inventario SET cantidad_disponible = cantidad_disponible + $1 WHERE producto_id = $2 RETURNING *`
    : `UPDATE Inventario SET cantidad_disponible = cantidad_disponible - $1 WHERE producto_id = $2 RETURNING *`;
  const values = [cantidad, producto_id];
  const res = await pool.query(query, values);
  return res.rows[0];
};

// Obtener el inventario de un producto por ID
const getInventoryById = async (producto_id) => {
  const query = 'SELECT * FROM Inventario WHERE producto_id = $1';
  const res = await pool.query(query, [producto_id]);
  return res.rows[0];
};

// Obtener el inventario de todos los productos
const getInventories = async () => {
  const query = `
    SELECT p.nombre, i.cantidad_disponible
    FROM Inventario i
    JOIN Producto p ON i.producto_id = p.id`;
  const res = await pool.query(query);
  return res.rows;
};

module.exports = {
  createInventory,
  updateInventory,
  getInventoryById,
  getInventories,
};
