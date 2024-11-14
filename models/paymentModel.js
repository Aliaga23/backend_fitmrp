// archivo: models/paymentModel.js

const pool = require('../config/db');

// Obtener todos los métodos de pago
const getAllPaymentMethods = async () => {
  const query = 'SELECT * FROM MetodoPago';
  const { rows } = await pool.query(query);
  return rows;
};

// Crear un nuevo método de pago
const createPaymentMethod = async (nombre_metodo, detalles) => {
  const query = `
    INSERT INTO MetodoPago (nombre_metodo, detalles) 
    VALUES ($1, $2) RETURNING *`;
  const values = [nombre_metodo, detalles];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

// Actualizar un método de pago existente
const updatePaymentMethod = async (id, nombre_metodo, detalles) => {
  const query = `
    UPDATE MetodoPago SET nombre_metodo = $1, detalles = $2 
    WHERE id = $3 RETURNING *`;
  const values = [nombre_metodo, detalles, id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

// Eliminar un método de pago
const deletePaymentMethod = async (id) => {
  const query = 'DELETE FROM MetodoPago WHERE id = $1 RETURNING *';
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

module.exports = {
  getAllPaymentMethods,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
};
