const pool = require('../config/db');

// Crear una nueva orden de compra
const createOrdenCompra = async (proveedor_id, usuario_id, inventario_id, fecha, estado) => {
  const query = `
    INSERT INTO OrdenCompra (proveedor_id, usuario_id, inventario_id, fecha, estado)
    VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const values = [proveedor_id, usuario_id, inventario_id, fecha, estado];
  const res = await pool.query(query, values);
  return res.rows[0];
};

// Obtener todas las órdenes de compra
const getOrdenesCompra = async () => {
  const query = 'SELECT * FROM OrdenCompra';
  const res = await pool.query(query);
  return res.rows;
};

// Obtener una orden de compra por ID
const getOrdenCompraById = async (id) => {
  const query = 'SELECT * FROM OrdenCompra WHERE id = $1';
  const res = await pool.query(query, [id]);
  return res.rows[0];
};

// Actualizar una orden de compra
const updateOrdenCompra = async (id, proveedor_id, usuario_id, inventario_id, fecha, estado) => {
  const query = `
    UPDATE OrdenCompra 
    SET proveedor_id = $1, usuario_id = $2, inventario_id = $3, fecha = $4, estado = $5
    WHERE id = $6 RETURNING *`;
  const values = [proveedor_id, usuario_id, inventario_id, fecha, estado, id];
  const res = await pool.query(query, values);
  return res.rows[0];
};

// Eliminar una orden de compra
const deleteOrdenCompra = async (id) => {
  const query = 'DELETE FROM OrdenCompra WHERE id = $1 RETURNING *';
  const res = await pool.query(query, [id]);
  return res.rows[0];
};

module.exports = {
  createOrdenCompra,
  getOrdenesCompra,
  getOrdenCompraById,
  updateOrdenCompra,
  deleteOrdenCompra,
};
