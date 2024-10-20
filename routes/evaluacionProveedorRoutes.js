const express = require('express');
const { createEvaluation, getEvaluations, getEvaluationByProveedorId } = require('../controllers/evaluacionProveedorController');
const router = express.Router();

// Ruta para crear una nueva evaluación de proveedor
router.post('/', createEvaluation);

// Ruta para obtener todas las evaluaciones de proveedores
router.get('/', getEvaluations);

// Ruta para obtener las evaluaciones de un proveedor específico
router.get('/proveedor/:proveedor_id', getEvaluationByProveedorId);

module.exports = router;
