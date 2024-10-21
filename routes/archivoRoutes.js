const express = require('express');
const archivoController = require('../controllers/archivoController');
const router = express.Router();

// Ruta para subir archivos
router.post('/upload', archivoController.uploadFile);

module.exports = router;
