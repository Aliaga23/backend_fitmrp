const express = require('express');
const { obtenerBitacora } = require('../controllers/bitacoraController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Ruta para obtener los registros de la bitácora
router.get(
  '/',obtenerBitacora
);

module.exports = router;
