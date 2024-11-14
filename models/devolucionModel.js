// devolucionModel.js
const db = require('../config/db');

// Crear devolución
exports.createDevolucion = async (pedido_id, motivo, estado) => {
    const query = `
        INSERT INTO Devolucion (pedido_id, motivo, fecha_solicitud, estado) 
        VALUES ($1, $2, NOW(), $3) 
        RETURNING *;
    `;
    const values = [pedido_id, motivo, estado];
    const result = await db.query(query, values);
    return result.rows[0];
};

// Obtener todas las devoluciones
exports.getDevoluciones = async () => {
    const result = await db.query(`SELECT * FROM Devolucion`);
    return result.rows;
};

// Obtener una devolución por ID
exports.getDevolucionById = async (id) => {
    const result = await db.query(`SELECT * FROM Devolucion WHERE id = $1`, [id]);
    return result.rows[0];
};

// Actualizar devolución
exports.updateDevolucion = async (id, motivo, estado) => {
    const query = `
        UPDATE Devolucion 
        SET motivo = $1, estado = $2 
        WHERE id = $3 
        RETURNING *;
    `;
    const values = [motivo, estado, id];
    const result = await db.query(query, values);
    return result.rows[0];
};

// Eliminar devolución
exports.deleteDevolucion = async (id) => {
    const result = await db.query(`DELETE FROM Devolucion WHERE id = $1 RETURNING *`, [id]);
    return result.rows[0];
};
