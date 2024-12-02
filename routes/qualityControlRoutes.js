const express = require('express');
const {
  createQualityControl,
  getQualityControls,
  getQualityControlByProductId,
} = require('../controllers/qualityControlController');
const { verifyToken } = require('../middlewares/authMiddleware');
const registrarBitacora = require('../middlewares/bitacoraMiddleware');

const router = express.Router();

// Ruta para registrar un control de calidad
router.post(
  '/',
  verifyToken,
  registrarBitacora('Registro de un control de calidad de producto'),
  createQualityControl
);

// Ruta para obtener todos los controles de calidad
router.get(
  '/',
  verifyToken,
  registrarBitacora('Consulta de todos los controles de calidad de productos'),
  getQualityControls
);

// Ruta para obtener controles de calidad de un producto específico
router.get(
  '/producto/:producto_id',
  verifyToken,
  registrarBitacora('Consulta de controles de calidad de un producto específico'),
  getQualityControlByProductId
);

module.exports = router;
