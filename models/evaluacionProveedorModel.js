const pool = require('../config/db');

// Crear una nueva evaluación de proveedor
const createEvaluation = async (proveedor_id, puntaje, fecha_evaluacion, observaciones) => {
  const query = `
    INSERT INTO EvaluacionProveedor (proveedor_id, puntaje, fecha_evaluacion, observaciones)
    VALUES ($1, $2, $3, $4) RETURNING *`;
  const values = [proveedor_id, puntaje, fecha_evaluacion, observaciones];
  const res = await pool.query(query, values);
  return res.rows[0];
};

// Obtener todas las evaluaciones de proveedores
const getEvaluations = async () => {
  const query = `
    SELECT ep.id, p.nombre AS proveedor, ep.puntaje, ep.fecha_evaluacion, ep.observaciones
    FROM EvaluacionProveedor ep
    JOIN Proveedor p ON ep.proveedor_id = p.id`;
  const res = await pool.query(query);
  return res.rows;
};

// Obtener evaluaciones de un proveedor específico por ID
const getEvaluationByProveedorId = async (proveedor_id) => {
  const query = `
    SELECT ep.id, p.nombre AS proveedor, ep.puntaje, ep.fecha_evaluacion, ep.observaciones
    FROM EvaluacionProveedor ep
    JOIN Proveedor p ON ep.proveedor_id = p.id
    WHERE ep.proveedor_id = $1`;
  const res = await pool.query(query, [proveedor_id]);
  return res.rows;
};

module.exports = {
  createEvaluation,
  getEvaluations,
  getEvaluationByProveedorId
};
