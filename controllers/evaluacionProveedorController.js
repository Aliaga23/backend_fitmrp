const { createEvaluation, getEvaluations, getEvaluationByProveedorId } = require('../models/evaluacionProveedorModel');

// Registrar una nueva evaluación de proveedor
exports.createEvaluation = async (req, res) => {
  const { proveedor_id, puntaje, fecha_evaluacion, observaciones } = req.body;
  try {
    const newEvaluation = await createEvaluation(proveedor_id, puntaje, fecha_evaluacion, observaciones);
    res.status(201).json(newEvaluation);
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar la evaluación', error: error.message });
  }
};

// Obtener todas las evaluaciones de proveedores
exports.getEvaluations = async (req, res) => {
  try {
    const evaluations = await getEvaluations();
    res.status(200).json(evaluations);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las evaluaciones', error: error.message });
  }
};

// Obtener las evaluaciones de un proveedor específico
exports.getEvaluationByProveedorId = async (req, res) => {
  const { proveedor_id } = req.params;
  try {
    const evaluations = await getEvaluationByProveedorId(proveedor_id);
    if (evaluations.length === 0) {
      return res.status(404).json({ message: 'No se encontraron evaluaciones para este proveedor' });
    }
    res.status(200).json(evaluations);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las evaluaciones del proveedor', error: error.message });
  }
};
