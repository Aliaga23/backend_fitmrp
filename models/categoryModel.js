const pool = require('../config/db');

// Crear una nueva categoría
const createCategory = async (nombre) => {
  const query = 'INSERT INTO Categoria (nombre) VALUES ($1) RETURNING *';
  const values = [nombre];
  const res = await pool.query(query, values);
  return res.rows[0];
};

// Obtener todas las categorías
const getCategories = async () => {
  const query = 'SELECT * FROM Categoria';
  const res = await pool.query(query);
  return res.rows;
};

// Obtener una categoría por ID
const getCategoryById = async (id) => {
  const query = 'SELECT * FROM Categoria WHERE id = $1';
  const res = await pool.query(query, [id]);
  return res.rows[0];
};

// Actualizar una categoría
const updateCategory = async (id, nombre) => {
  const query = 'UPDATE Categoria SET nombre = $1 WHERE id = $2 RETURNING *';
  const values = [nombre, id];
  const res = await pool.query(query, values);
  return res.rows[0];
};

// Eliminar una categoría
const deleteCategory = async (id) => {
  const query = 'DELETE FROM Categoria WHERE id = $1 RETURNING *';
  const res = await pool.query(query, [id]);
  return res.rows[0];
};

module.exports = { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory };
