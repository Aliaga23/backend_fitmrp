// backend/controllers/authController.js
const bcrypt = require('bcryptjs');
const { createUser, getUserByEmail } = require('../models/userModel');

// Registro de usuario
exports.signUpUser = async (req, res) => {
  const { nombre, email, password, rol_id } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
    const newUser = await createUser(nombre, email, hashedPassword, rol_id);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
};

// Inicio de sesión
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar el usuario por email
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Crear el token (implementación del token no incluida aquí)
    res.status(200).json({ message: 'Inicio de sesión exitoso', user });
  } catch (error) {
    res.status(500).json({ message: 'Error en el login' });
  }
};
