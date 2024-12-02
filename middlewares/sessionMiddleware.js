const pool = require('../config/db'); // Asegúrate de que esta ruta apunte a tu configuración de PostgreSQL

async function configurarSesionPostgres(req, res, next) {
    try {
        // Captura la IP y el usuario de la solicitud
        const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        // Configurar variables de sesión en PostgreSQL
        const client = await pool.connect();
     
        if (ipAddress) {
            await client.query(`SET app.ip_address = '${ipAddress}'`);
        }
        client.release(); // Libera la conexión al pool

        console.log(`Sesión configurada:  IP=${ipAddress}`);
    } catch (err) {
        console.error('Error al configurar la sesión en PostgreSQL:', err.message);
    }

    // Continuar con la siguiente acción
    next();
}

module.exports = configurarSesionPostgres;
