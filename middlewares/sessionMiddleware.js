const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const requestIp = require('request-ip');

const JWT_SECRET = process.env.JWT_SECRET || 'secreto';

async function configurarSesionPostgres(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Extraer el token JWT

        if (!token) {
            console.warn('Token no proporcionado, no se configurarán variables de sesión.');
            return next();
        }

        // Decodificar el token JWT
        let decoded;
        try {
            decoded = jwt.verify(token, JWT_SECRET); // Decodificar el token
        } catch (err) {
            console.warn('Token no válido o expirado, no se configurarán variables de sesión.');
            return next();
        }

        const usuarioId = decoded.id; // Extraer el ID del usuario desde el token
        const ipAddress = requestIp.getClientIp(req); // Obtener la IP del cliente

        // Configurar las variables de sesión en PostgreSQL
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
