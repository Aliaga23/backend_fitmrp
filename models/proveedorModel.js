const pool = require('../config/db');

// Crear un nuevo proveedor
const createProveedor = async (nombre, direccion, telefono, email) => {
  const query = 'INSERT INTO Proveedor (nombre, direccion, telefono, email) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [nombre, direccion, telefono, email];
  const res = await pool.query(query, values);
  return res.rows[0];
};

// Obtener todos los proveedores
const getProveedores = async () => {
  const query = 'SELECT * FROM Proveedor';
  const res = await pool.query(query);
  return res.rows;
};

// Obtener un proveedor por ID
const getProveedorById = async (id) => {
  const query = 'SELECT * FROM Proveedor WHERE id = $1';
  const res = await pool.query(query, [id]);
  return res.rows[0];
};

// Actualizar un proveedor
const updateProveedor = async (id, nombre, direccion, telefono, email) => {
  const query = 'UPDATE Proveedor SET nombre = $1, direccion = $2, telefono = $3, email = $4 WHERE id = $5 RETURNING *';
  const values = [nombre, direccion, telefono, email, id];
  const res = await pool.query(query, values);
  return res.rows[0];
};

// Eliminar un proveedor
const deleteProveedor = async (id) => {
  const query = 'DELETE FROM Proveedor WHERE id = $1 RETURNING *';
  const res = await pool.query(query, [id]);
  return res.rows[0];
};

module.exports = {
  createProveedor,
  getProveedores,
  getProveedorById,
  updateProveedor,
  deleteProveedor,
};
