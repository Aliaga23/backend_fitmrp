const pool = require('../config/db');

// Crear un nuevo producto
const createProduct = async (nombre, descripcion, precio, categoria_id) => {
  const query = `
    INSERT INTO Producto (nombre, descripcion, precio, categoria_id)
    VALUES ($1, $2, $3, $4) RETURNING *`;
  const values = [nombre, descripcion, precio, categoria_id];
  const res = await pool.query(query, values);
  return res.rows[0];
};

// Obtener todos los productos
const getProducts = async () => {
  const query = 'SELECT * FROM Producto';
  const res = await pool.query(query);
  return res.rows;
};

// Obtener un producto por ID
const getProductById = async (id) => {
  const query = 'SELECT * FROM Producto WHERE id = $1';
  const res = await pool.query(query, [id]);
  return res.rows[0];
};

// Actualizar un producto
const updateProduct = async (id, nombre, descripcion, precio, categoria_id) => {
  const query = `
    UPDATE Producto
    SET nombre = $1, descripcion = $2, precio = $3, categoria_id = $4
    WHERE id = $5 RETURNING *`;
  const values = [nombre, descripcion, precio, categoria_id, id];
  const res = await pool.query(query, values);
  return res.rows[0];
};

// Eliminar un producto
const deleteProduct = async (id) => {
  const query = 'DELETE FROM Producto WHERE id = $1 RETURNING *';
  const res = await pool.query(query, [id]);
  return res.rows[0];
};

module.exports = { createProduct, getProducts, getProductById, updateProduct, deleteProduct };
