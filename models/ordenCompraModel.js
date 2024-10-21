const pool = require('../config/db');

// Crear una nueva orden de compra (sin inventario_id, usando tipo_orden)
const createOrdenCompra = async (usuario_id, fecha, estado, tipo_orden) => {
  const query = `
    INSERT INTO OrdenCompra (usuario_id, fecha, estado, tipo_orden)
    VALUES ($1, $2, $3, $4) RETURNING *`;
  const values = [usuario_id, fecha, estado, tipo_orden];
  const res = await pool.query(query, values);
  return res.rows[0];
};

// Obtener todas las órdenes de compra (sin inventario)
const getOrdenesCompra = async () => {
  const query = `
    SELECT oc.id, 
           u.nombre AS usuario, 
           oc.fecha, 
           oc.estado, 
           oc.tipo_orden
    FROM OrdenCompra oc
    JOIN Usuario u ON oc.usuario_id = u.id`;
  const res = await pool.query(query);
  return res.rows;
};

// Obtener una orden de compra por ID
const getOrdenCompraById = async (id) => {
  const query = `
    SELECT oc.id, 
           u.nombre AS usuario, 
           oc.fecha, 
           oc.estado, 
           oc.tipo_orden
    FROM OrdenCompra oc
    JOIN Usuario u ON oc.usuario_id = u.id
    WHERE oc.id = $1`;
  const res = await pool.query(query, [id]);
  return res.rows[0];
};

// Actualizar una orden de compra (sin inventario_id, usando tipo_orden)
const updateOrdenCompra = async (id, usuario_id, fecha, estado, tipo_orden) => {
  const query = `
    UPDATE OrdenCompra 
    SET usuario_id = $1, fecha = $2, estado = $3, tipo_orden = $4
    WHERE id = $5 RETURNING *`;
  const values = [usuario_id, fecha, estado, tipo_orden, id];
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
