const { createQualityControl, getQualityControls, getQualityControlByProductId } = require('../models/qualityControlModel');

// Registrar un nuevo control de calidad para un producto
exports.createQualityControl = async (req, res) => {
  const { producto_id, resultado, observaciones } = req.body;

  try {
    // Registrar control de calidad en la base de datos
    const newQualityControl = await createQualityControl(producto_id, resultado, observaciones);
    res.status(201).json(newQualityControl);
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el control de calidad', error: error.message });
  }
};

// Obtener todos los controles de calidad
exports.getQualityControls = async (req, res) => {
  try {
    const qualityControls = await getQualityControls();
    res.status(200).json(qualityControls);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los controles de calidad', error: error.message });
  }
};

// Obtener los controles de calidad de un producto específico
exports.getQualityControlByProductId = async (req, res) => {
  const { producto_id } = req.params;

  try {
    const qualityControls = await getQualityControlByProductId(producto_id);
    if (qualityControls.length === 0) {
      return res.status(404).json({ message: 'No se encontraron controles de calidad para este producto' });
    }
    res.status(200).json(qualityControls);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los controles de calidad del producto', error: error.message });
  }
};
