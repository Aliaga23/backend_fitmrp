const {
    createOrdenCompra,
    getOrdenesCompra,
    getOrdenCompraById,
    updateOrdenCompra,
    deleteOrdenCompra,
  } = require('../models/ordenCompraModel');
  
  // Crear una nueva orden de compra
  exports.createOrdenCompra = async (req, res) => {
    const { proveedor_id, usuario_id, inventario_id, fecha, estado } = req.body;
  
    try {
      const newOrdenCompra = await createOrdenCompra(proveedor_id, usuario_id, inventario_id, fecha, estado);
      res.status(201).json(newOrdenCompra);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear la orden de compra', error: error.message });
    }
  };
  
  // Obtener todas las órdenes de compra
  exports.getOrdenesCompra = async (req, res) => {
    try {
      const ordenesCompra = await getOrdenesCompra();
      res.status(200).json(ordenesCompra);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las órdenes de compra', error: error.message });
    }
  };
  
  // Obtener una orden de compra por ID
  exports.getOrdenCompraById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const ordenCompra = await getOrdenCompraById(id);
      if (!ordenCompra) {
        return res.status(404).json({ message: 'Orden de compra no encontrada' });
      }
      res.status(200).json(ordenCompra);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la orden de compra', error: error.message });
    }
  };
  
  // Actualizar una orden de compra
  exports.updateOrdenCompra = async (req, res) => {
    const { id } = req.params;
    const { proveedor_id, usuario_id, inventario_id, fecha, estado } = req.body;
  
    try {
      const updatedOrdenCompra = await updateOrdenCompra(id, proveedor_id, usuario_id, inventario_id, fecha, estado);
      if (!updatedOrdenCompra) {
        return res.status(404).json({ message: 'Orden de compra no encontrada' });
      }
      res.status(200).json(updatedOrdenCompra);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar la orden de compra', error: error.message });
    }
  };
  
  // Eliminar una orden de compra
  exports.deleteOrdenCompra = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedOrdenCompra = await deleteOrdenCompra(id);
      if (!deletedOrdenCompra) {
        return res.status(404).json({ message: 'Orden de compra no encontrada' });
      }
      res.status(200).json(deletedOrdenCompra);
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar la orden de compra', error: error.message });
    }
  };
  