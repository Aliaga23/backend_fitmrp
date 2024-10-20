const express = require('express');
const {
  createQualityControlMateriaPrima,
  getQualityControlsMateriaPrima,
  getQualityControlByMateriaPrimaId,
} = require('../controllers/qualityControlMateriaPrimaController');
const router = express.Router();

// Ruta para registrar un control de calidad para materia prima
router.post('/', createQualityControlMateriaPrima);

// Ruta para obtener todos los controles de calidad de materia prima (con nombre de materia prima)
router.get('/', getQualityControlsMateriaPrima);

// Ruta para obtener controles de calidad de una materia prima específica (con nombre de materia prima)
router.get('/materia-prima/:materia_prima_id', getQualityControlByMateriaPrimaId);

module.exports = router;
