const pool = require('../config/db');

// Crear un nuevo rol
const createRole = async (nombre) => {
  const query = 'INSERT INTO Rol (nombre) VALUES ($1) RETURNING *';
  const values = [nombre];
  const res = await pool.query(query, values);
  return res.rows[0];
};

// Obtener todos los roles
const getRoles = async () => {
  const query = 'SELECT * FROM Rol';
  const res = await pool.query(query);
  return res.rows;
};

// Obtener un rol por ID
const getRoleById = async (id) => {
  const query = 'SELECT * FROM Rol WHERE id = $1';
  const res = await pool.query(query, [id]);
  return res.rows[0];
};

// Actualizar un rol
const updateRole = async (id, nombre) => {
  const query = 'UPDATE Rol SET nombre = $1 WHERE id = $2 RETURNING *';
  const values = [nombre, id];
  const res = await pool.query(query, values);
  return res.rows[0];
};

// Eliminar un rol
const deleteRole = async (id) => {
  const query = 'DELETE FROM Rol WHERE id = $1 RETURNING *';
  const res = await pool.query(query, [id]);
  return res.rows[0];
};

module.exports = { createRole, getRoles, getRoleById, updateRole, deleteRole };
