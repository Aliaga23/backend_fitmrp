const pool = require('../config/db');

// Crear una nueva orden de compra de materia prima
const createOrdenCompraMateriaPrima = async (orden_compra_id, materia_prima_id, cantidad) => {
  const query = `
    INSERT INTO OrdenCompraMateriaPrima (orden_compra_id, materia_prima_id, cantidad)
    VALUES ($1, $2, $3) RETURNING *`;
  const values = [orden_compra_id, materia_prima_id, cantidad];
  const res = await pool.query(query, values);
  return res.rows[0];
};
// Obtener todas las órdenes de compra de materia prima con nombres de materia prima
const getOrdenesCompraMateriaPrima = async () => {
    const query = `
      SELECT ocmp.orden_compra_id, 
             mp.nombre AS materia_prima, 
             ocmp.cantidad 
      FROM OrdenCompraMateriaPrima ocmp
      JOIN MateriaPrima mp ON ocmp.materia_prima_id = mp.id
    `;
    const res = await pool.query(query);
    return res.rows;
  };
  
  // Obtener una orden de compra de materia prima por ID con nombre de materia prima
  const getOrdenCompraMateriaPrimaById = async (orden_compra_id) => {
    const query = `
      SELECT ocmp.orden_compra_id, 
             mp.nombre AS materia_prima, 
             ocmp.cantidad 
      FROM OrdenCompraMateriaPrima ocmp
      JOIN MateriaPrima mp ON ocmp.materia_prima_id = mp.id
      WHERE ocmp.orden_compra_id = $1
    `;
    const res = await pool.query(query, [orden_compra_id]);
    return res.rows;
  };
  

// Actualizar una orden de compra de materia prima
const updateOrdenCompraMateriaPrima = async (orden_compra_id, materia_prima_id, cantidad) => {
  const query = `
    UPDATE OrdenCompraMateriaPrima 
    SET materia_prima_id = $1, cantidad = $2
    WHERE orden_compra_id = $3 RETURNING *`;
  const values = [materia_prima_id, cantidad, orden_compra_id];
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
