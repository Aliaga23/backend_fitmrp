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

// Obtener todos los controles de calidad de materia prima junto con el nombre de la materia prima
const getQualityControlsMateriaPrima = async () => {
  const query = `
    SELECT ccmp.id, ccmp.materia_prima_id, mp.nombre AS materia_prima_nombre, ccmp.resultado, ccmp.observaciones, ccmp.fecha_control
    FROM ControlCalidadMateriaPrima ccmp
    JOIN MateriaPrima mp ON ccmp.materia_prima_id = mp.id
  `;
  const res = await pool.query(query);
  return res.rows;
};

// Obtener los controles de calidad por materia_prima_id junto con el nombre de la materia prima
const getQualityControlByMateriaPrimaId = async (materia_prima_id) => {
  const query = `
    SELECT ccmp.id, ccmp.materia_prima_id, mp.nombre AS materia_prima_nombre, ccmp.resultado, ccmp.observaciones, ccmp.fecha_control
    FROM ControlCalidadMateriaPrima ccmp
    JOIN MateriaPrima mp ON ccmp.materia_prima_id = mp.id
    WHERE ccmp.materia_prima_id = $1
  `;
  const res = await pool.query(query, [materia_prima_id]);
  return res.rows;
};

module.exports = {
  createQualityControlMateriaPrima,
  getQualityControlsMateriaPrima,
  getQualityControlByMateriaPrimaId,
};
