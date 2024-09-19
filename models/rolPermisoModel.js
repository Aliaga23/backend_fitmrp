const pool = require('../config/db');

// Asignar un permiso a un rol
const addRolPermiso = async (rolId, permisoId) => {
  const query = 'INSERT INTO RolPermiso (rol_id, permiso_id) VALUES ($1, $2) RETURNING *';
  const values = [rolId, permisoId];
  const res = await pool.query(query, values);
  return res.rows[0];
};

// Obtener todas las relaciones rol-permiso
const getAllRolPermisos = async () => {
  const query = 'SELECT * FROM RolPermiso';
  const res = await pool.query(query);
  return res.rows;
};

// Obtener permisos por rol ID
const getPermisosByRolId = async (rolId) => {
  const query = 'SELECT * FROM RolPermiso WHERE rol_id = $1';
  const res = await pool.query(query, [rolId]);
  return res.rows;
};

// Eliminar una relación rol-permiso
const deleteRolPermiso = async (rolId, permisoId) => {
  const query = 'DELETE FROM RolPermiso WHERE rol_id = $1 AND permiso_id = $2 RETURNING *';
  const values = [rolId, permisoId];
  const res = await pool.query(query, values);
  return res.rows[0];
};

module.exports = {
  addRolPermiso,
  getAllRolPermisos,
  getPermisosByRolId,
  deleteRolPermiso,
};
