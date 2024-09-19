const { createLot, getLots, getLotById, updateLot, deleteLot } = require('../models/lotModel');

// Crear un nuevo lote
exports.createLot = async (req, res) => {
  const { producto_id, numero_lote, fecha_vencimiento } = req.body;
  try {
    const newLot = await createLot(producto_id, numero_lote, fecha_vencimiento);
    res.status(201).json(newLot);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el lote', error: error.message });
  }
};

// Obtener todos los lotes
exports.getLots = async (req, res) => {
  try {
    const lots = await getLots();
    res.status(200).json(lots);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los lotes', error: error.message });
  }
};

// Obtener un lote por ID
exports.getLotById = async (req, res) => {
  const { id } = req.params;
  try {
    const lot = await getLotById(id);
    if (!lot) {
      return res.status(404).json({ message: 'Lote no encontrado' });
    }
    res.status(200).json(lot);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el lote', error: error.message });
  }
};

// Actualizar un lote
exports.updateLot = async (req, res) => {
    const { id } = req.params;
    const { numero_lote, fecha_vencimiento } = req.body;
    try {
      const updatedLot = await updateLot(id, numero_lote, fecha_vencimiento);
      if (!updatedLot) {
        return res.status(404).json({ message: 'Lote no encontrado' });
      }
      res.status(200).json(updatedLot);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el lote', error: error.message });
    }
  };
  
  // Eliminar un lote
  exports.deleteLot = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedLot = await deleteLot(id);
      if (!deletedLot) {
        return res.status(404).json({ message: 'Lote no encontrado' });
      }
      res.status(200).json(deletedLot);
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el lote', error: error.message });
    }
  };
  
