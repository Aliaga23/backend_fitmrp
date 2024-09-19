const { createPermiso, getPermisos, getPermisoById, updatePermiso, deletePermiso } = require('../models/permisoModel');

// Crear un nuevo permiso
exports.createPermiso = async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    const newPermiso = await createPermiso(nombre, descripcion);
    res.status(201).json(newPermiso);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el permiso', error: error.message });
  }
};

// Obtener todos los permisos
exports.getPermisos = async (req, res) => {
  try {
    const permisos = await getPermisos();
    res.status(200).json(permisos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los permisos', error: error.message });
  }
};

// Obtener un permiso por ID
exports.getPermisoById = async (req, res) => {
  const { id } = req.params;
  try {
    const permiso = await getPermisoById(id);
    if (!permiso) {
      return res.status(404).json({ message: 'Permiso no encontrado' });
    }
    res.status(200).json(permiso);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el permiso', error: error.message });
  }
};

// Actualizar un permiso
exports.updatePermiso = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;
  try {
    const updatedPermiso = await updatePermiso(id, nombre, descripcion);
    if (!updatedPermiso) {
      return res.status(404).json({ message: 'Permiso no encontrado' });
    }
    res.status(200).json(updatedPermiso);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el permiso', error: error.message });
  }
};

// Eliminar un permiso
exports.deletePermiso = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPermiso = await deletePermiso(id);
    if (!deletedPermiso) {
      return res.status(404).json({ message: 'Permiso no encontrado' });
    }
    res.status(200).json(deletedPermiso);
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el permiso', error: error.message });
  }
};
