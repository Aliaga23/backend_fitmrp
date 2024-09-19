const { addRolPermiso, getAllRolPermisos, getPermisosByRolId, deleteRolPermiso } = require('../models/rolPermisoModel');

// Asignar un permiso a un rol
exports.addRolPermiso = async (req, res) => {
  const { rol_id, permiso_id } = req.body;
  try {
    const newRolPermiso = await addRolPermiso(rol_id, permiso_id);
    res.status(201).json(newRolPermiso);
  } catch (error) {
    res.status(500).json({ message: 'Error al asignar el permiso al rol', error: error.message });
  }
};

// Obtener todas las relaciones rol-permiso
exports.getAllRolPermisos = async (req, res) => {
  try {
    const rolPermisos = await getAllRolPermisos();
    res.status(200).json(rolPermisos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las relaciones rol-permiso', error: error.message });
  }
};

// Obtener permisos por rol ID
exports.getPermisosByRolId = async (req, res) => {
  const { rol_id } = req.params;
  try {
    const permisos = await getPermisosByRolId(rol_id);
    if (permisos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron permisos para este rol' });
    }
    res.status(200).json(permisos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los permisos del rol', error: error.message });
  }
};

// Eliminar una relación rol-permiso
exports.deleteRolPermiso = async (req, res) => {
  const { rol_id, permiso_id } = req.body;
  try {
    const deletedRolPermiso = await deleteRolPermiso(rol_id, permiso_id);
    if (!deletedRolPermiso) {
      return res.status(404).json({ message: 'Relación rol-permiso no encontrada' });
    }
    res.status(200).json(deletedRolPermiso);
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la relación rol-permiso', error: error.message });
  }
};
