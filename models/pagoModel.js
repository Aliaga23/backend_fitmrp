const pool = require('../config/db');

const createPayment = async (pedido_id, metodo_pago_id, monto) => {
  const query = `
    INSERT INTO Pago (pedido_id, metodo_pago_id, monto, estado)
    VALUES ($1, $2, $3, 'pendiente') RETURNING *`;
  const values = [pedido_id, metodo_pago_id, monto];
  const res = await pool.query(query, values);
  return res.rows[0];
};

module.exports = {
  createPayment,
};
