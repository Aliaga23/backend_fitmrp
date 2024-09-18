const { createRole, getRoles, getRoleById, updateRole, deleteRole } = require('../models/roleModel');

// Crear un nuevo rol
exports.createRole = async (req, res) => {
  const { nombre } = req.body;
  try {
    const newRole = await createRole(nombre);
    res.status(201).json(newRole);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el rol', error: error.message });
  }
};

// Obtener todos los roles
exports.getRoles = async (req, res) => {
  try {
    const roles = await getRoles();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los roles', error: error.message });
  }
};

// Obtener un rol por ID
exports.getRoleById = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await getRoleById(id);
    if (!role) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el rol', error: error.message });
  }
};

// Actualizar un rol
exports.updateRole = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const updatedRole = await updateRole(id, nombre);
    if (!updatedRole) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }
    res.status(200).json(updatedRole);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el rol', error: error.message });
  }
};

// Eliminar un rol
exports.deleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRole = await deleteRole(id);
    if (!deletedRole) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }
    res.status(200).json(deletedRole);
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el rol', error: error.message });
  }
};
