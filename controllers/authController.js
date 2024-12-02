// controllers/authController.js
const logger = require('../config/logger');  
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const requestIp = require('request-ip'); // Importa el paquete request-ip

const { createUser, getUserByEmail } = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'secreto'; 

exports.signUpUser = async (req, res) => {
  const { nombre, email, password, rol_id } = req.body;

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      logger.warn(`Intento fallido de registro: El usuario con email ${email} ya existe.`);
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(nombre, email, hashedPassword, rol_id);
    logger.info(`Usuario registrado con éxito: ${email}`);
    res.status(201).json(newUser);
  } catch (error) {
    logger.error(`Error al registrar usuario: ${error.message}`);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      logger.warn(`Intento fallido de inicio de sesión: Usuario con email ${email} no encontrado.`);
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn(`Contraseña incorrecta para el usuario: ${email}`);
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Crear el token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, rol_id: user.rol_id },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    logger.info(`Inicio de sesión exitoso para el usuario: ${email}`);

    // Obtener la dirección IP del cliente
    const ipAddress = requestIp.getClientIp(req);

    // Registrar la sesión en la base de datos
    const client = await pool.connect();
    await client.query(
      `INSERT INTO Sesion (usuario_id, token, ip_address) VALUES ($1, $2, $3)`,
      [user.id, token, ipAddress]
    );
    client.release();

    logger.info(`Sesión registrada: UsuarioID=${user.id}, IP=${ipAddress}`);

    // Excluir el password de los datos enviados en la respuesta
    const { password: _, ...userData } = user;
    res.status(200).json({ token, user: userData });
  } catch (error) {
    logger.error(`Error en el login: ${error.message}`);
    res.status(500).json({ message: 'Error en el login' });
  }
};
exports.logoutUser = async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(400).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const usuarioId = decoded.id;

    const client = await pool.connect();
    await client.query(
      `UPDATE Sesion SET estado = 'cerrada', fecha_fin = CURRENT_TIMESTAMP WHERE token = $1 AND usuario_id = $2`,
      [token, usuarioId]
    );
    client.release();

    logger.info(`Sesión cerrada: UsuarioID=${usuarioId}`);
    res.status(200).json({ message: 'Sesión cerrada con éxito' });
  } catch (error) {
    logger.error(`Error al cerrar sesión: ${error.message}`);
    res.status(500).json({ message: 'Error al cerrar sesión' });
  }
};
