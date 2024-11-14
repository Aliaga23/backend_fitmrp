const pool = require('../config/db');


// Crear un nuevo carrito para el usuario
const createCart = async (usuario_id) => {
  const query = 'INSERT INTO Carrito (usuario_id, estado) VALUES ($1, $2) RETURNING *';
  const values = [usuario_id, 'activo'];
  const res = await pool.query(query, values);
  return res.rows[0];
};

// Obtener el carrito activo de un usuario
const getActiveCartByUserId = async (usuario_id) => {
  const query = 'SELECT * FROM Carrito WHERE usuario_id = $1 AND estado = $2';
  const values = [usuario_id, 'activo'];
  const res = await pool.query(query, values);
  return res.rows[0];
};

// Añadir producto al carrito
const addItemToCart = async (carrito_id, producto_id, cantidad) => {
  const query = `
    INSERT INTO Carrito_Items (carrito_id, producto_id, cantidad) 
    VALUES ($1, $2, $3)
    ON CONFLICT (carrito_id, producto_id)
    DO UPDATE SET cantidad = Carrito_Items.cantidad + $3
    RETURNING *`;
  const values = [carrito_id, producto_id, cantidad];
  const res = await pool.query(query, values);
  return res.rows[0];
};

// Eliminar un producto del carrito
const removeItemFromCart = async (carrito_id, producto_id) => {
  const query = 'DELETE FROM Carrito_Items WHERE carrito_id = $1 AND producto_id = $2 RETURNING *';
  const res = await pool.query(query, [carrito_id, producto_id]);
  return res.rows[0];
};

// Completar el carrito (cambia estado a completado)
const completeCart = async (carrito_id) => {
  const query = 'UPDATE Carrito SET estado = $1 WHERE id = $2 RETURNING *';
  const res = await pool.query(query, ['completado', carrito_id]);
  return res.rows[0];
};
// Función para contar los productos en el carrito activo de un usuario
const countItemsInCart = async (usuario_id) => {
  const query = `
    SELECT COUNT(producto_id) AS count 
    FROM Carrito_Items 
    INNER JOIN Carrito ON Carrito.id = Carrito_Items.carrito_id
    WHERE Carrito.usuario_id = $1 AND Carrito.estado = 'activo'
  `;
  const values = [usuario_id];
  const res = await pool.query(query, values);
  return res.rows[0].count || 0;
};
// Actualizar la cantidad de un producto en el carrito
const updateCartItem = async (carrito_id, producto_id, cantidad) => {
  const query = `
    UPDATE Carrito_Items SET cantidad = $1
    WHERE carrito_id = $2 AND producto_id = $3 RETURNING *`;
  const values = [cantidad, carrito_id, producto_id];
  const res = await pool.query(query, values);
  return res.rows[0];
};
// Función para obtener productos con detalles en un carrito activo
const getCartItems = async (carrito_id) => {
  const query = `
    SELECT ci.producto_id, p.nombre, p.descripcion, p.precio AS precio_unitario, ci.cantidad
    FROM Carrito_Items ci
    JOIN Producto p ON ci.producto_id = p.id
    WHERE ci.carrito_id = $1
  `;
  const res = await pool.query(query, [carrito_id]);
  return res.rows;
};
module.exports = {
  createCart,
  getActiveCartByUserId,
  addItemToCart,
  getCartItems,
  countItemsInCart,
  updateCartItem,
  removeItemFromCart,
  completeCart,
};
