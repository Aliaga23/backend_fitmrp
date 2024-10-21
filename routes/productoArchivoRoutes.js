const express = require('express');
const router = express.Router();
const productoArchivoController = require('../controllers/productoArchivoController');

router.post('/associate', productoArchivoController.associateArchivoWithProducto);

module.exports = router;
