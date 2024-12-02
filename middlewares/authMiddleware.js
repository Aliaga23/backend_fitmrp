const jwt = require('jsonwebtoken');
const pool = require('../config/db'); // Conexión a la base de datos

// Middleware para verificar el token JWT y configurar variables de sesión
const verifyToken = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET || 'secreto');
    req.user = decoded; // Guardar la información del usuario en el objeto req

    // Obtener la IP del usuario
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Configurar las variables de sesión en PostgreSQL
    const client = await pool.connect();
    await client.query(`SET SESSION "app.user_id" = $1`, [decoded.id]);
    await client.query(`SET SESSION "app.user_ip" = $1`, [ip]);
    client.release();

    next(); // Continuar con la siguiente función
  } catch (error) {
    return res.status(401).json({ message: 'Token no válido o expirado' });
  }
};

module.exports = { verifyToken };
