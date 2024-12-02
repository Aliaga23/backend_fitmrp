const pool = require('../config/db'); // Conexión a la base de datos

const Bitacora = {
    registrar: async (usuarioId, ip, accion) => {
        const query = `
            INSERT INTO Bitacora (usuario_id, ip, accion)
            VALUES ($1, $2, $3)
        `;
        await pool.query(query, [usuarioId, ip, accion]);
    },

    obtenerRegistros: async () => {
        const query = `
            SELECT b.id, u.nombre AS usuario, b.ip, b.accion, b.fecha
            FROM Bitacora b
            JOIN Usuario u ON b.usuario_id = u.id
            ORDER BY b.fecha DESC
        `;
        const { rows } = await pool.query(query);
        return rows;
    }
};

module.exports = Bitacora;
