const express = require('express');
const {
  createMateriaPrima,
  getMateriasPrimas,
  getMateriaPrimaById,
  updateMateriaPrima,
  deleteMateriaPrima,
} = require('../controllers/materiaPrimaController');
const { verifyToken } = require('../middlewares/authMiddleware');
const registrarBitacora = require('../middlewares/bitacoraMiddleware');

const router = express.Router();

// Ruta para crear una nueva materia prima
router.post(
  '/',
  verifyToken,
  registrarBitacora('Creación de una nueva materia prima'),
  createMateriaPrima
);

// Ruta para obtener todas las materias primas
router.get(
  '/',
  verifyToken,
  registrarBitacora('Consulta de todas las materias primas'),
  getMateriasPrimas
);

// Ruta para obtener una materia prima por ID
router.get(
  '/:id',
  verifyToken,
  registrarBitacora('Consulta de una materia prima por ID'),
  getMateriaPrimaById
);

// Ruta para actualizar una materia prima por ID
router.put(
  '/:id',
  verifyToken,
  registrarBitacora('Actualización de una materia prima'),
  updateMateriaPrima
);

// Ruta para eliminar una materia prima por ID
router.delete(
  '/:id',
  verifyToken,
  registrarBitacora('Eliminación de una materia prima'),
  deleteMateriaPrima
);

module.exports = router;
