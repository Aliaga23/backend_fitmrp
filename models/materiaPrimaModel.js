const pool = require('../config/db');

// Crear una nueva materia prima
const createMateriaPrima = async (nombre, descripcion) => {
  const query = 'INSERT INTO MateriaPrima (nombre, descripcion) VALUES ($1, $2) RETURNING *';
  const values = [nombre, descripcion];
  const res = await pool.query(query, values);
  return res.rows[0];
};

// Obtener todas las materias primas
const getMateriasPrimas = async () => {
  const query = 'SELECT * FROM MateriaPrima';
  const res = await pool.query(query);
  return res.rows;
};

// Obtener una materia prima por ID
const getMateriaPrimaById = async (id) => {
  const query = 'SELECT * FROM MateriaPrima WHERE id = $1';
  const res = await pool.query(query, [id]);
  return res.rows[0];
};

// Actualizar una materia prima
const updateMateriaPrima = async (id, nombre, descripcion) => {
  const query = 'UPDATE MateriaPrima SET nombre = $1, descripcion = $2 WHERE id = $3 RETURNING *';
  const values = [nombre, descripcion, id];
  const res = await pool.query(query, values);
  return res.rows[0];
};

// Eliminar una materia prima
const deleteMateriaPrima = async (id) => {
  const query = 'DELETE FROM MateriaPrima WHERE id = $1 RETURNING *';
  const res = await pool.query(query, [id]);
  return res.rows[0];
};

module.exports = {
  createMateriaPrima,
  getMateriasPrimas,
  getMateriaPrimaById,
  updateMateriaPrima,
  deleteMateriaPrima,
};
