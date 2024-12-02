const express = require('express');
const {
  createQualityControlMateriaPrima,
  getQualityControlsMateriaPrima,
  getQualityControlByMateriaPrimaId,
} = require('../controllers/qualityControlMateriaPrimaController');
const { verifyToken } = require('../middlewares/authMiddleware');
const registrarBitacora = require('../middlewares/bitacoraMiddleware');

const router = express.Router();

// Ruta para registrar un control de calidad para materia prima
router.post(
  '/',
  verifyToken,
  registrarBitacora('Registro de un control de calidad para materia prima'),
  createQualityControlMateriaPrima
);

// Ruta para obtener todos los controles de calidad de materia prima (con nombre de materia prima)
router.get(
  '/',
  verifyToken,
  registrarBitacora('Consulta de todos los controles de calidad de materia prima'),
  getQualityControlsMateriaPrima
);

// Ruta para obtener controles de calidad de una materia prima específica (con nombre de materia prima)
router.get(
  '/materia-prima/:materia_prima_id',
  verifyToken,
  registrarBitacora('Consulta de controles de calidad de una materia prima específica'),
  getQualityControlByMateriaPrimaId
);

module.exports = router;
