const {
  createOrdenCompraMateriaPrima,
  getOrdenesCompraMateriaPrima,
  getOrdenCompraMateriaPrimaById,
  updateOrdenCompraMateriaPrima,
  deleteOrdenCompraMateriaPrima,
} = require('../models/ordenCompraMateriaPrimaModel');

// Crear una nueva orden de compra de materia prima
exports.createOrdenCompraMateriaPrima = async (req, res) => {
  const { orden_compra_id, proveedor_id, materia_prima_id, cantidad } = req.body;

  try {
    const newOrdenCompraMateriaPrima = await createOrdenCompraMateriaPrima(orden_compra_id, proveedor_id, materia_prima_id, cantidad);
    res.status(201).json(newOrdenCompraMateriaPrima);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la orden de compra de materia prima', error: error.message });
  }
};

// Obtener todas las órdenes de compra de materia prima
exports.getOrdenesCompraMateriaPrima = async (req, res) => {
  try {
    const ordenesCompraMateriaPrima = await getOrdenesCompraMateriaPrima();
    res.status(200).json(ordenesCompraMateriaPrima);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las órdenes de compra de materia prima', error: error.message });
  }
};

// Obtener una orden de compra de materia prima por ID
exports.getOrdenCompraMateriaPrimaById = async (req, res) => {
  const { orden_compra_id } = req.params;

  try {
    const ordenCompraMateriaPrima = await getOrdenCompraMateriaPrimaById(orden_compra_id);
    if (!ordenCompraMateriaPrima) {
      return res.status(404).json({ message: 'Orden de compra de materia prima no encontrada' });
    }
    res.status(200).json(ordenCompraMateriaPrima);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la orden de compra de materia prima', error: error.message });
  }
};

// Actualizar una orden de compra de materia prima
exports.updateOrdenCompraMateriaPrima = async (req, res) => {
  const { orden_compra_id } = req.params;
  const { proveedor_id, materia_prima_id, cantidad } = req.body;

  try {
    const updatedOrdenCompraMateriaPrima = await updateOrdenCompraMateriaPrima(orden_compra_id, proveedor_id, materia_prima_id, cantidad);
    if (!updatedOrdenCompraMateriaPrima) {
      return res.status(404).json({ message: 'Orden de compra de materia prima no encontrada' });
    }
    res.status(200).json(updatedOrdenCompraMateriaPrima);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la orden de compra de materia prima', error: error.message });
  }
};

// Eliminar una orden de compra de materia prima
exports.deleteOrdenCompraMateriaPrima = async (req, res) => {
  const { orden_compra_id } = req.params;

  try {
    const deletedOrdenCompraMateriaPrima = await deleteOrdenCompraMateriaPrima(orden_compra_id);
    if (!deletedOrdenCompraMateriaPrima) {
      return res.status(404).json({ message: 'Orden de compra de materia prima no encontrada' });
    }
    res.status(200).json(deletedOrdenCompraMateriaPrima);
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la orden de compra de materia prima', error: error.message });
  }
};
