const pool = require('../config/db');

// Crear un nuevo usuario
const createUser = async (nombre, email, password, rol_id) => {
  const query = `
    INSERT INTO Usuario (nombre, email, password, rol_id)
    VALUES ($1, $2, $3, $4) RETURNING *`;
  const values = [nombre, email, password, rol_id];
  try {
    const res = await pool.query(query, values);
    return res.rows[0];
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    throw error;
  }
};

// Actualizar un usuario
const updateUser = async (id, nombre, email, rol_id) => {
  const query = `
    UPDATE Usuario
    SET nombre = $1, email = $2, rol_id = $3
    WHERE id = $4 RETURNING *`;
  const values = [nombre, email, rol_id, id];
  try {
    const res = await pool.query(query, values);
    return res.rows[0];
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw error;
  }
};

// Obtener todos los usuarios
const getUsers = async () => {
  const query = 'SELECT * FROM Usuario';
  try {
    const res = await pool.query(query);
    return res.rows;
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    throw error;
  }
};

// Obtener un usuario por ID
const getUserById = async (id) => {
  const query = 'SELECT * FROM Usuario WHERE id = $1';
  try {
    const res = await pool.query(query, [id]);
    return res.rows[0];
  } catch (error) {
    console.error('Error al obtener el usuario por ID:', error);
    throw error;
  }
};

// Eliminar un usuario
const deleteUser = async (id) => {
  const query = 'DELETE FROM Usuario WHERE id = $1 RETURNING *';
  try {
    const res = await pool.query(query, [id]);
    return res.rows[0];
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    throw error;
  }
};

// Obtener un usuario por email
const getUserByEmail = async (email) => {
  const query = 'SELECT * FROM Usuario WHERE email = $1';
  try {
    const res = await pool.query(query, [email]);
    return res.rows[0];
  } catch (error) {
    console.error('Error al obtener el usuario por email:', error);
    throw error;
  }
};

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser, getUserByEmail };
