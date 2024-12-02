const express = require('express');
const {
  createEvaluation,
  getEvaluations,
  getEvaluationByProveedorId,
} = require('../controllers/evaluacionProveedorController');
const { verifyToken } = require('../middlewares/authMiddleware');
const registrarBitacora = require('../middlewares/bitacoraMiddleware');

const router = express.Router();

// Ruta para crear una nueva evaluación de proveedor
router.post(
  '/',
  verifyToken,
  registrarBitacora('Creación de una evaluación de proveedor'),
  createEvaluation
);

// Ruta para obtener todas las evaluaciones de proveedores
router.get(
  '/',
  verifyToken,
  registrarBitacora('Consulta de todas las evaluaciones de proveedores'),
  getEvaluations
);

// Ruta para obtener las evaluaciones de un proveedor específico
router.get(
  '/proveedor/:proveedor_id',
  verifyToken,
  registrarBitacora('Consulta de evaluaciones para un proveedor específico'),
  getEvaluationByProveedorId
);

module.exports = router;
