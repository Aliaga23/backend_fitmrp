const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto');
    req.user = decoded; // Guardar la información del usuario en el objeto req
    next(); // Continuar con la siguiente función
  } catch (error) {
    return res.status(401).json({ message: 'Token no válido o expirado' });
  }
};

module.exports = { verifyToken };
