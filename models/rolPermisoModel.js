const pool = require('../config/db');

// Asignar un permiso a un rol
const addRolPermiso = async (rolId, permisoId) => {
  const query = 'INSERT INTO RolPermiso (rol_id, permiso_id) VALUES ($1, $2) RETURNING *';
  const values = [rolId, permisoId];
  const res = await pool.query(query, values);
  return res.rows[0];
};

// Obtener todas las relaciones rol-permiso con los nombres de los roles y permisos
const getAllRolPermisos = async () => {
  const query = `
    SELECT rp.rol_id, r.nombre AS rol_nombre, rp.permiso_id, p.nombre AS permiso_nombre
    FROM RolPermiso rp
    JOIN Rol r ON rp.rol_id = r.id
    JOIN Permiso p ON rp.permiso_id = p.id;
  `;
  const res = await pool.query(query);
  return res.rows;
};

// Obtener permisos por ID de rol
const getPermisosByRolId = async (rolId) => {
  const query = `
    SELECT rp.permiso_id, p.nombre AS permiso_nombre
    FROM RolPermiso rp
    JOIN Permiso p ON rp.permiso_id = p.id
    WHERE rp.rol_id = $1;
  `;
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
