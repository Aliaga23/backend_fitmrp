// controllers/OrdenCompraProductoController.js
const {
    getAll,
    getById,
    getProductsByOrderId,
    createOrdenCompraProducto,
    updateOrdenCompraProducto,
    deleteOrdenCompraProducto,
  } = require('../models/OrdenCompraProductoModel');
  
  // Obtener todos los registros
  exports.getAll = async (req, res) => {
    try {
      const records = await getAll();
      res.status(200).json(records);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los registros.' });
    }
  };
  
  // Obtener un registro por orden_compra_id y producto_id
  exports.getById = async (req, res) => {
    const { orden_compra_id, producto_id } = req.params;
    try {
      const record = await getById(orden_compra_id, producto_id);
      if (!record) {
        return res.status(404).json({ message: 'Registro no encontrado' });
      }
      res.status(200).json(record);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el registro.' });
    }
  };
  
  // Obtener todos los productos por ID de orden de compra
  exports.getProductsByOrderId = async (req, res) => {
    const { orden_compra_id } = req.params;
    try {
      const products = await getProductsByOrderId(orden_compra_id);
      if (products.length === 0) {
        return res.status(404).json({ message: 'No se encontraron productos para esta orden de compra.' });
      }
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los productos de la orden de compra.' });
    }
  };
  
  // Crear un nuevo registro
  exports.createOrdenCompraProducto = async (req, res) => {
    const { orden_compra_id, producto_id, cantidad } = req.body;
    try {
      const newRecord = await createOrdenCompraProducto(orden_compra_id, producto_id, cantidad);
      res.status(201).json(newRecord);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el registro.' });
    }
  };
  
  // Actualizar un registro
  exports.updateOrdenCompraProducto = async (req, res) => {
    const { orden_compra_id, producto_id } = req.params;
    const { cantidad } = req.body;
    try {
      const updatedRecord = await updateOrdenCompraProducto(orden_compra_id, producto_id, cantidad);
      if (!updatedRecord) {
        return res.status(404).json({ message: 'Registro no encontrado' });
      }
      res.status(200).json(updatedRecord);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el registro.' });
    }
  };
  
  // Eliminar un registro
  exports.deleteOrdenCompraProducto = async (req, res) => {
    const { orden_compra_id, producto_id } = req.params;
    try {
      const deletedRecord = await deleteOrdenCompraProducto(orden_compra_id, producto_id);
      if (!deletedRecord) {
        return res.status(404).json({ message: 'Registro no encontrado' });
      }
      res.status(200).json(deletedRecord);
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el registro.' });
    }
  };
  