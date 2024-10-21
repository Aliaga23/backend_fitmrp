// models/OrdenCompraProductoModel.js
const pool = require('../config/db');

// Obtener todos los registros con el nombre del producto
const getAll = async () => {
  const query = `
    SELECT ocp.orden_compra_id, ocp.producto_id, ocp.cantidad, p.nombre AS producto_nombre
    FROM OrdenCompraProducto ocp
    JOIN Producto p ON ocp.producto_id = p.id
  `;
  const res = await pool.query(query);
  return res.rows;
};

// Obtener un registro por orden_compra_id y producto_id, incluyendo el nombre del producto
const getById = async (orden_compra_id, producto_id) => {
  const query = `
    SELECT ocp.orden_compra_id, ocp.producto_id, ocp.cantidad, p.nombre AS producto_nombre
    FROM OrdenCompraProducto ocp
    JOIN Producto p ON ocp.producto_id = p.id
    WHERE ocp.orden_compra_id = $1 AND ocp.producto_id = $2
  `;
  const res = await pool.query(query, [orden_compra_id, producto_id]);
  return res.rows[0];
};

// Obtener todos los productos de una orden de compra específica
const getProductsByOrderId = async (orden_compra_id) => {
  const query = `
    SELECT ocp.orden_compra_id, p.id AS producto_id, p.nombre AS producto_nombre, ocp.cantidad
    FROM OrdenCompraProducto ocp
    JOIN Producto p ON ocp.producto_id = p.id
    WHERE ocp.orden_compra_id = $1
  `;
  const res = await pool.query(query, [orden_compra_id]);
  return res.rows;
};

// Crear un nuevo registro en la tabla OrdenCompraProducto
const createOrdenCompraProducto = async (orden_compra_id, producto_id, cantidad) => {
  const query = 'INSERT INTO OrdenCompraProducto (orden_compra_id, producto_id, cantidad) VALUES ($1, $2, $3) RETURNING *';
  const values = [orden_compra_id, producto_id, cantidad];
  const res = await pool.query(query, values);
  return res.rows[0];
};

// Actualizar un registro en la tabla OrdenCompraProducto
const updateOrdenCompraProducto = async (orden_compra_id, producto_id, cantidad) => {
  const query = 'UPDATE OrdenCompraProducto SET cantidad = $3 WHERE orden_compra_id = $1 AND producto_id = $2 RETURNING *';
  const values = [orden_compra_id, producto_id, cantidad];
  const res = await pool.query(query, values);
  return res.rows[0];
};

// Eliminar un registro de la tabla OrdenCompraProducto
const deleteOrdenCompraProducto = async (orden_compra_id, producto_id) => {
  const query = 'DELETE FROM OrdenCompraProducto WHERE orden_compra_id = $1 AND producto_id = $2 RETURNING *';
  const res = await pool.query(query, [orden_compra_id, producto_id]);
  return res.rows[0];
};

module.exports = {
  getAll,
  getById,
  getProductsByOrderId,
  createOrdenCompraProducto,
  updateOrdenCompraProducto,
  deleteOrdenCompraProducto,
};
