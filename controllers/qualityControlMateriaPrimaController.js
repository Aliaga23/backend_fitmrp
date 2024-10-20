const {
    createQualityControlMateriaPrima,
    getQualityControlsMateriaPrima,
    getQualityControlByMateriaPrimaId,
  } = require('../models/qualityControlMateriaPrimaModel');
  
  // Registrar un nuevo control de calidad para materia prima
  exports.createQualityControlMateriaPrima = async (req, res) => {
    const { materia_prima_id, resultado, observaciones } = req.body;
  
    try {
      // Registrar control de calidad en la base de datos
      const newQualityControl = await createQualityControlMateriaPrima(materia_prima_id, resultado, observaciones);
      res.status(201).json(newQualityControl);
    } catch (error) {
      res.status(500).json({ message: 'Error al registrar el control de calidad', error: error.message });
    }
  };
  
  // Obtener todos los controles de calidad de materia prima
  exports.getQualityControlsMateriaPrima = async (req, res) => {
    try {
      const qualityControls = await getQualityControlsMateriaPrima();
      res.status(200).json(qualityControls);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los controles de calidad', error: error.message });
    }
  };
  
  // Obtener los controles de calidad de una materia prima específica
  exports.getQualityControlByMateriaPrimaId = async (req, res) => {
    const { materia_prima_id } = req.params;
  
    try {
      const qualityControls = await getQualityControlByMateriaPrimaId(materia_prima_id);
      if (qualityControls.length === 0) {
        return res.status(404).json({ message: 'No se encontraron controles de calidad para esta materia prima' });
      }
      res.status(200).json(qualityControls);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los controles de calidad de la materia prima', error: error.message });
    }
  };
  