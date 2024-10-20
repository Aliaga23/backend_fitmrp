const {
    createProveedor,
    getProveedores,
    getProveedorById,
    updateProveedor,
    deleteProveedor,
  } = require('../models/proveedorModel');
  
  // Crear un nuevo proveedor
  exports.createProveedor = async (req, res) => {
    const { nombre, direccion, telefono, email } = req.body;
    try {
      const newProveedor = await createProveedor(nombre, direccion, telefono, email);
      res.status(201).json(newProveedor);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el proveedor' });
    }
  };
  
  // Obtener todos los proveedores
  exports.getProveedores = async (req, res) => {
    try {
      const proveedores = await getProveedores();
      res.status(200).json(proveedores);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los proveedores' });
    }
  };
  
  // Obtener un proveedor por ID
  exports.getProveedorById = async (req, res) => {
    const { id } = req.params;
    try {
      const proveedor = await getProveedorById(id);
      if (!proveedor) {
        return res.status(404).json({ message: 'Proveedor no encontrado' });
      }
      res.status(200).json(proveedor);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el proveedor' });
    }
  };
  
  // Actualizar un proveedor
  exports.updateProveedor = async (req, res) => {
    const { id } = req.params;
    const { nombre, direccion, telefono, email } = req.body;
    try {
      const updatedProveedor = await updateProveedor(id, nombre, direccion, telefono, email);
      if (!updatedProveedor) {
        return res.status(404).json({ message: 'Proveedor no encontrado' });
      }
      res.status(200).json(updatedProveedor);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el proveedor' });
    }
  };
  
  // Eliminar un proveedor
  exports.deleteProveedor = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedProveedor = await deleteProveedor(id);
      if (!deletedProveedor) {
        return res.status(404).json({ message: 'Proveedor no encontrado' });
      }
      res.status(200).json(deletedProveedor);
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el proveedor' });
    }
  };
  