const express = require('express');
const router = express.Router();
const archivoController = require('../controllers/archivoController');

router.post('/upload', archivoController.uploadFile);

module.exports = router;
