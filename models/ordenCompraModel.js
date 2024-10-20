const pool = require('../config/db');

// Crear una nueva orden de compra (sin proveedor_id)
const createOrdenCompra = async (usuario_id, inventario_id, fecha, estado) => {
  const query = `
    INSERT INTO OrdenCompra (usuario_id, inventario_id, fecha, estado)
    VALUES ($1, $2, $3, $4) RETURNING *`;
  const values = [usuario_id, inventario_id, fecha, estado];
  const res = await pool.query(query, values);
  return res.rows[0];
};

// Obtener todas las órdenes de compra (sin proveedor)
const getOrdenesCompra = async () => {
  const query = `
    SELECT oc.id, 
           u.nombre AS usuario, 
           inv.producto_id, 
           prod.nombre AS producto, 
           oc.fecha, 
           oc.estado
    FROM OrdenCompra oc
    JOIN Usuario u ON oc.usuario_id = u.id
    JOIN Inventario inv ON oc.inventario_id = inv.id
    JOIN Producto prod ON inv.producto_id = prod.id`;
  const res = await pool.query(query);
  return res.rows;
};

// Obtener una orden de compra por ID (sin proveedor)
const getOrdenCompraById = async (id) => {
  const query = `
    SELECT oc.id, 
           u.nombre AS usuario, 
           inv.producto_id, 
           prod.nombre AS producto, 
           oc.fecha, 
           oc.estado
    FROM OrdenCompra oc
    JOIN Usuario u ON oc.usuario_id = u.id
    JOIN Inventario inv ON oc.inventario_id = inv.id
    JOIN Producto prod ON inv.producto_id = prod.id
    WHERE oc.id = $1`;
  const res = await pool.query(query, [id]);
  return res.rows[0];
};

// Actualizar una orden de compra (sin proveedor_id)
const updateOrdenCompra = async (id, usuario_id, inventario_id, fecha, estado) => {
  const query = `
    UPDATE OrdenCompra 
    SET usuario_id = $1, inventario_id = $2, fecha = $3, estado = $4
    WHERE id = $5 RETURNING *`;
  const values = [usuario_id, inventario_id, fecha, estado, id];
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
