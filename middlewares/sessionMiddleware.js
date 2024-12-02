const pool = require('../config/db');
const requestIp = require('request-ip');

async function configurarSesionPostgres(req, res, next) {
    try {
        const usuarioId = req.user?.id || null; // Obtenido del token JWT o sesión
        const ipAddress = requestIp.getClientIp(req); // Obtener la IP del cliente

        if (!usuarioId) {
            console.warn('Usuario no autenticado, no se configurarán variables de sesión.');
            return next();
        }

        const client = await pool.connect();
        await client.query(`SET app.usuario_id = '${usuarioId}'`);
        await client.query(`SET app.ip_address = '${ipAddress}'`);
        client.release();

        console.info(`Sesión configurada: UsuarioID=${usuarioId}, IP=${ipAddress}`);
    } catch (error) {
        console.error('Error al configurar las variables de sesión en PostgreSQL:', error.message);
    }
    next();
}

module.exports = configurarSesionPostgres;
