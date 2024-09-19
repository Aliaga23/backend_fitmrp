const pool = require('../config/db');

// Crear un nuevo permiso
const createPermiso = async (nombre, descripcion) => {
  const query = 'INSERT INTO Permiso (nombre, descripcion) VALUES ($1, $2) RETURNING *';
  const values = [nombre, descripcion];
  const res = await pool.query(query, values);
  return res.rows[0];
};

// Obtener todos los permisos
const getPermisos = async () => {
  const query = 'SELECT * FROM Permiso';
  const res = await pool.query(query);
  return res.rows;
};

// Obtener un permiso por ID
const getPermisoById = async (id) => {
  const query = 'SELECT * FROM Permiso WHERE id = $1';
  const res = await pool.query(query, [id]);
  return res.rows[0];
};

// Actualizar un permiso
const updatePermiso = async (id, nombre, descripcion) => {
  const query = 'UPDATE Permiso SET nombre = $1, descripcion = $2 WHERE id = $3 RETURNING *';
  const values = [nombre, descripcion, id];
  const res = await pool.query(query, values);
  return res.rows[0];
};

// Eliminar un permiso
const deletePermiso = async (id) => {
  const query = 'DELETE FROM Permiso WHERE id = $1 RETURNING *';
  const res = await pool.query(query, [id]);
  return res.rows[0];
};

module.exports = {
  createPermiso,
  getPermisos,
  getPermisoById,
  updatePermiso,
  deletePermiso,
};
