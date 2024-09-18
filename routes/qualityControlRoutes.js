const express = require('express');
const { createQualityControl, getQualityControls, getQualityControlByProductId } = require('../controllers/qualityControlController');
const router = express.Router();

// Ruta para registrar un control de calidad
router.post('/', createQualityControl);

// Ruta para obtener todos los controles de calidad
router.get('/', getQualityControls);

// Ruta para obtener controles de calidad de un producto específico
router.get('/producto/:producto_id', getQualityControlByProductId);

module.exports = router;
