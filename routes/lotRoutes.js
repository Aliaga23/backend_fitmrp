const express = require('express');
const { createLot, getLots, getLotById, updateLot, deleteLot } = require('../controllers/lotController');
const router = express.Router();

// Ruta para crear un nuevo lote
router.post('/', createLot);

// Ruta para obtener todos los lotes
router.get('/', getLots);

// Ruta para obtener un lote por ID
router.get('/:id', getLotById);

// Ruta para actualizar un lote
router.put('/:id', updateLot);

// Ruta para eliminar un lote
router.delete('/:id', deleteLot);

module.exports = router;
