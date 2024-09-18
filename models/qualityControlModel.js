const pool = require('../config/db');

// Registrar un control de calidad para un producto
const createQualityControl = async (producto_id, resultado, observaciones) => {
  const query = `
    INSERT INTO ControlCalidad (producto_id, resultado, observaciones)
    VALUES ($1, $2, $3) RETURNING *`;
  const values = [producto_id, resultado, observaciones];
  const res = await pool.query(query, values);
  return res.rows[0];
};

// Obtener todos los controles de calidad
const getQualityControls = async () => {
  const query = 'SELECT * FROM ControlCalidad';
  const res = await pool.query(query);
  return res.rows;
};

// Obtener los controles de calidad por producto_id
const getQualityControlByProductId = async (producto_id) => {
  const query = 'SELECT * FROM ControlCalidad WHERE producto_id = $1';
  const res = await pool.query(query, [producto_id]);
  return res.rows;
};

module.exports = { createQualityControl, getQualityControls, getQualityControlByProductId };
