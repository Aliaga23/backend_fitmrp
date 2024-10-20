const pool = require('../config/db');

// Registrar un control de calidad para materia prima
const createQualityControlMateriaPrima = async (materia_prima_id, resultado, observaciones) => {
  const query = `
    INSERT INTO ControlCalidadMateriaPrima (materia_prima_id, resultado, observaciones)
    VALUES ($1, $2, $3) RETURNING *`;
  const values = [materia_prima_id, resultado, observaciones];
  const res = await pool.query(query, values);
  return res.rows[0];
};

// Obtener todos los controles de calidad de materia prima
const getQualityControlsMateriaPrima = async () => {
  const query = 'SELECT * FROM ControlCalidadMateriaPrima';
  const res = await pool.query(query);
  return res.rows;
};

// Obtener los controles de calidad por materia_prima_id
const getQualityControlByMateriaPrimaId = async (materia_prima_id) => {
  const query = 'SELECT * FROM ControlCalidadMateriaPrima WHERE materia_prima_id = $1';
  const res = await pool.query(query, [materia_prima_id]);
  return res.rows;
};

module.exports = {
  createQualityControlMateriaPrima,
  getQualityControlsMateriaPrima,
  getQualityControlByMateriaPrimaId,
};
