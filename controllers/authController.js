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

  
    // Crear el token JWT e incluir datos adicionales en el payload
   
    const token = jwt.sign(
      { id: user.id, email: user.email, rol_id: user.rol_id },

      JWT_SECRET,
      { expiresIn: '1h' }
    );

    logger.info(`Inicio de sesión exitoso para el usuario: ${email}`);
   // Obtener la dirección IP del cliente usando request-ip
   const ipAddress = requestIp.getClientIp(req);

   // Configurar las variables de sesión en PostgreSQL
   const client = await pool.connect();
   await client.query(`SET app.usuario_id = '${user.id}'`);
   await client.query(`SET app.ip_address = '${ipAddress}'`);
   client.release();

   logger.info(`Sesión configurada: UsuarioID=${user.id}, IP=${ipAddress}`);
    
      
    // Excluir el password de los datos enviados en la respuesta
    const { password: _, ...userData } = user;
    res.status(200).json({ token, user: userData });
  } catch (error) {
    logger.error(`Error en el login: ${error.message}`);
    res.status(500).json({ message: 'Error en el login' });
  }
};
