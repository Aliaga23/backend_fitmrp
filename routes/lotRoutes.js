const express = require('express');
const {
  createLot,
  getLots,
  getLotById,
  updateLot,
  deleteLot,
} = require('../controllers/lotController');
const { verifyToken } = require('../middlewares/authMiddleware');
const registrarBitacora = require('../middlewares/bitacoraMiddleware');

const router = express.Router();

// Ruta para crear un nuevo lote
router.post(
  '/',
  verifyToken,
  registrarBitacora('Creación de un nuevo lote'),
  createLot
);

// Ruta para obtener todos los lotes
router.get(
  '/',
  verifyToken,
  registrarBitacora('Consulta de todos los lotes'),
  getLots
);

// Ruta para obtener un lote por ID
router.get(
  '/:id',
  verifyToken,
  registrarBitacora('Consulta de un lote por ID'),
  getLotById
);

// Ruta para actualizar un lote
router.put(
  '/:id',
  verifyToken,
  registrarBitacora('Actualización de un lote'),
  updateLot
);

// Ruta para eliminar un lote
router.delete(
  '/:id',
  verifyToken,
  registrarBitacora('Eliminación de un lote'),
  deleteLot
);

module.exports = router;
