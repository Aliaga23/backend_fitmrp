const pool = require('../config/db');

// Crear una nueva orden de compra de materia prima, solo si hay una orden de compra de tipo producto
const createOrdenCompraMateriaPrima = async (orden_compra_id, materia_prima_id, cantidad) => {
  // Verificar si la orden de compra es de tipo 'producto'
  const queryCheckOrden = `
    SELECT tipo_orden, proveedor_id
    FROM OrdenCompra 
    WHERE id = $1 AND tipo_orden = 'producto'
  `;
  const resCheck = await pool.query(queryCheckOrden, [orden_compra_id]);

  if (resCheck.rows.length === 0) {
    throw new Error('Solo se puede crear una orden de compra de materia prima si la orden de compra es de tipo "producto".');
  }

  const proveedor_id = resCheck.rows[0].proveedor_id;

  // Si existe la orden de tipo 'producto', crear la orden de compra de materia prima
  const queryInsert = `
    INSERT INTO OrdenCompraMateriaPrima (orden_compra_id, materia_prima_id, cantidad, proveedor_id)
    VALUES ($1, $2, $3, $4) RETURNING *
  `;
  const values = [orden_compra_id, materia_prima_id, cantidad, proveedor_id];
  const res = await pool.query(queryInsert, values);
  
  return res.rows[0];
};

// Obtener todas las órdenes de compra de materia prima
const getOrdenesCompraMateriaPrima = async () => {
  const query = `
    SELECT ocmp.*, mp.nombre AS materia_prima_nombre, p.nombre AS proveedor_nombre
    FROM OrdenCompraMateriaPrima ocmp
    JOIN MateriaPrima mp ON ocmp.materia_prima_id = mp.id
    JOIN Proveedor p ON ocmp.proveedor_id = p.id
  `;
  const res = await pool.query(query);
  return res.rows;
};

// Obtener una orden de compra de materia prima por ID
const getOrdenCompraMateriaPrimaById = async (orden_compra_id, materia_prima_id) => {
  const query = `
    SELECT ocmp.*, mp.nombre AS materia_prima_nombre, p.nombre AS proveedor_nombre
    FROM OrdenCompraMateriaPrima ocmp
    JOIN MateriaPrima mp ON ocmp.materia_prima_id = mp.id
    JOIN Proveedor p ON ocmp.proveedor_id = p.id
    WHERE ocmp.orden_compra_id = $1 AND ocmp.materia_prima_id = $2
  `;
  const res = await pool.query(query, [orden_compra_id, materia_prima_id]);
  return res.rows[0];
};

// Actualizar una orden de compra de materia prima
const updateOrdenCompraMateriaPrima = async (orden_compra_id, materia_prima_id, cantidad) => {
  const query = `
    UPDATE OrdenCompraMateriaPrima 
    SET cantidad = $3 
    WHERE orden_compra_id = $1 AND materia_prima_id = $2 
    RETURNING *
  `;
  const res = await pool.query(query, [orden_compra_id, materia_prima_id, cantidad]);
  return res.rows[0];
};

// Eliminar una orden de compra de materia prima
const deleteOrdenCompraMateriaPrima = async (orden_compra_id, materia_prima_id) => {
  const query = `
    DELETE FROM OrdenCompraMateriaPrima 
    WHERE orden_compra_id = $1 AND materia_prima_id = $2 
    RETURNING *
  `;
  const res = await pool.query(query, [orden_compra_id, materia_prima_id]);
  return res.rows[0];
};

module.exports = {
  createOrdenCompraMateriaPrima,
  getOrdenesCompraMateriaPrima,
  getOrdenCompraMateriaPrimaById,
  updateOrdenCompraMateriaPrima,
  deleteOrdenCompraMateriaPrima
};
