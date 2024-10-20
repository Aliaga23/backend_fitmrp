const pool = require('../config/db');

// Registrar un movimiento de materia prima
const createMovementMateriaPrima = async (materia_prima_id, tipo_movimiento, cantidad, observaciones) => {
  const query = `
    INSERT INTO MovimientoMateriaPrima (materia_prima_id, tipo_movimiento, cantidad, observaciones)
    VALUES ($1, $2, $3, $4) RETURNING *`;
  const values = [materia_prima_id, tipo_movimiento, cantidad, observaciones];
  const res = await pool.query(query, values);
  return res.rows[0];
};

// Obtener todos los movimientos de materia prima
const getMovementsMateriaPrima = async () => {
  const query = 'SELECT * FROM MovimientoMateriaPrima';
  const res = await pool.query(query);
  return res.rows;
};

// Obtener los movimientos de una materia prima específica
const getMovementsByMateriaPrimaId = async (materia_prima_id) => {
  const query = 'SELECT * FROM MovimientoMateriaPrima WHERE materia_prima_id = $1';
  const res = await pool.query(query, [materia_prima_id]);
  return res.rows;
};

module.exports = {
  createMovementMateriaPrima,
  getMovementsMateriaPrima,
  getMovementsByMateriaPrimaId,
};
