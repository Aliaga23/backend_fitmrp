const pool = require('../config/db');

// Crear un nuevo registro de inventario de materia prima
const createInventarioMateriaPrima = async (materia_prima_id, cantidad_disponible) => {
  const query = `
    INSERT INTO InventarioMateriaPrima (materia_prima_id, cantidad_disponible)
    VALUES ($1, $2) RETURNING *`;
  const values = [materia_prima_id, cantidad_disponible];
  const res = await pool.query(query, values);
  return res.rows[0];
};

// Actualizar el stock de materia prima (entrada o salida)
const updateInventarioMateriaPrima = async (materia_prima_id, cantidad, esEntrada) => {
  const query = esEntrada
    ? `UPDATE InventarioMateriaPrima SET cantidad_disponible = cantidad_disponible + $1 WHERE materia_prima_id = $2 RETURNING *`
    : `UPDATE InventarioMateriaPrima SET cantidad_disponible = cantidad_disponible - $1 WHERE materia_prima_id = $2 RETURNING *`;
  const values = [cantidad, materia_prima_id];
  const res = await pool.query(query, values);
  return res.rows[0];
};

// Obtener el inventario de una materia prima por ID
const getInventarioMateriaPrimaById = async (materia_prima_id) => {
  const query = 'SELECT * FROM InventarioMateriaPrima WHERE materia_prima_id = $1';
  const res = await pool.query(query, [materia_prima_id]);
  return res.rows[0];
};

// Obtener el inventario de todas las materias primas
const getInventarioMateriasPrimas = async () => {
  const query = `
    SELECT mp.nombre, imp.cantidad_disponible
    FROM InventarioMateriaPrima imp
    JOIN MateriaPrima mp ON imp.materia_prima_id = mp.id`;
  const res = await pool.query(query);
  return res.rows;
};

module.exports = {
  createInventarioMateriaPrima,
  updateInventarioMateriaPrima,
  getInventarioMateriaPrimaById,
  getInventarioMateriasPrimas,
};
