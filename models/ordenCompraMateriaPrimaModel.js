const pool = require('../config/db');

// Crear una nueva orden de compra de materia prima con proveedor_id
const createOrdenCompraMateriaPrima = async (orden_compra_id, proveedor_id, materia_prima_id, cantidad) => {
  const query = `
    INSERT INTO OrdenCompraMateriaPrima (orden_compra_id, proveedor_id, materia_prima_id, cantidad)
    VALUES ($1, $2, $3, $4) RETURNING *`;
  const values = [orden_compra_id, proveedor_id, materia_prima_id, cantidad];
  const res = await pool.query(query, values);
  return res.rows[0];
};

// Obtener todas las órdenes de compra de materia prima con proveedor y nombre de materia prima
const getOrdenesCompraMateriaPrima = async () => {
  const query = `
    SELECT ocmp.orden_compra_id, 
           p.nombre AS proveedor, 
           mp.nombre AS materia_prima, 
           ocmp.cantidad 
    FROM OrdenCompraMateriaPrima ocmp
    JOIN Proveedor p ON ocmp.proveedor_id = p.id
    JOIN MateriaPrima mp ON ocmp.materia_prima_id = mp.id
  `;
  const res = await pool.query(query);
  return res.rows;
};

// Obtener una orden de compra de materia prima por ID con proveedor
const getOrdenCompraMateriaPrimaById = async (orden_compra_id) => {
  const query = `
    SELECT ocmp.orden_compra_id, 
           p.nombre AS proveedor, 
           mp.nombre AS materia_prima, 
           ocmp.cantidad 
    FROM OrdenCompraMateriaPrima ocmp
    JOIN Proveedor p ON ocmp.proveedor_id = p.id
    JOIN MateriaPrima mp ON ocmp.materia_prima_id = mp.id
    WHERE ocmp.orden_compra_id = $1
  `;
  const res = await pool.query(query, [orden_compra_id]);
  return res.rows[0];
};

// Actualizar una orden de compra de materia prima con proveedor_id
const updateOrdenCompraMateriaPrima = async (orden_compra_id, proveedor_id, materia_prima_id, cantidad) => {
  const query = `
    UPDATE OrdenCompraMateriaPrima 
    SET proveedor_id = $1, materia_prima_id = $2, cantidad = $3
    WHERE orden_compra_id = $4 RETURNING *`;
  const values = [proveedor_id, materia_prima_id, cantidad, orden_compra_id];
  const res = await pool.query(query, values);
  return res.rows[0];
};

// Eliminar una orden de compra de materia prima
const deleteOrdenCompraMateriaPrima = async (orden_compra_id) => {
  const query = 'DELETE FROM OrdenCompraMateriaPrima WHERE orden_compra_id = $1 RETURNING *';
  const res = await pool.query(query, [orden_compra_id]);
  return res.rows[0];
};

module.exports = {
  createOrdenCompraMateriaPrima,
  getOrdenesCompraMateriaPrima,
  getOrdenCompraMateriaPrimaById,
  updateOrdenCompraMateriaPrima,
  deleteOrdenCompraMateriaPrima,
};
