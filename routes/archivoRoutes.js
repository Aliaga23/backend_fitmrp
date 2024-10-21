const express = require('express');
const router = express.Router();
const archivoController = require('../controllers/archivoController');

// Definir la ruta para subir archivos
router.post('/upload', archivoController.uploadFile);

module.exports = router;
