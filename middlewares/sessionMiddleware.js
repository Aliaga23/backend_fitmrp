const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const requestIp = require('request-ip');

const JWT_SECRET = process.env.JWT_SECRET || 'secreto';

async function configurarSesionPostgres(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            console.warn('Token no proporcionado, no se configurarán variables de sesión.');
            return next();
        }

        // Decodificar el token JWT
        let decoded;
        try {
            decoded = jwt.verify(token, JWT_SECRET);
        } catch (err) {
            console.warn('Token no válido o expirado, no se configurarán variables de sesión.');
            return next();
        }

        const usuarioId = decoded.id;
        const ipAddress = requestIp.getClientIp(req);

        // Verificar si el token está en la tabla de sesiones activas
        const client = await pool.connect();
        const result = await client.query(
            `SELECT estado FROM Sesion WHERE token = $1 AND usuario_id = $2 AND estado = 'activa'`,
            [token, usuarioId]
        );
        client.release();

        if (result.rowCount === 0) {
            console.warn(`Sesión no activa para UsuarioID=${usuarioId}, no se configurarán variables de sesión.`);
            return next();
        }

        // Configurar las variables de sesión en PostgreSQL
        const client2 = await pool.connect();
        await client2.query(`SET app.usuario_id = '${usuarioId}'`);
        await client2.query(`SET app.ip_address = '${ipAddress}'`);
        client2.release();

        console.info(`Sesión configurada: UsuarioID=${usuarioId}, IP=${ipAddress}`);
    } catch (error) {
        console.error('Error al configurar las variables de sesión en PostgreSQL:', error.message);
    }
    next();
}

module.exports = configurarSesionPostgres;
