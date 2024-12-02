const express = require('express');
const {
  createInventarioMateriaPrima,
  updateInventarioMateriaPrima,
  getInventarioMateriaPrimaById,
  getInventarioMateriasPrimas,
} = require('../controllers/inventarioMateriaPrimaController');
const { verifyToken } = require('../middlewares/authMiddleware');
const registrarBitacora = require('../middlewares/bitacoraMiddleware');

const router = express.Router();

// Ruta para crear un nuevo inventario de materia prima
router.post(
  '/',
  verifyToken,
  registrarBitacora('Creación de un nuevo inventario de materia prima'),
  createInventarioMateriaPrima
);

// Ruta para actualizar el stock de una materia prima (entrada o salida)
router.put(
  '/:materia_prima_id',
  verifyToken,
  registrarBitacora('Actualización del stock de materia prima'),
  updateInventarioMateriaPrima
);

// Ruta para obtener el inventario de una materia prima específica
router.get(
  '/:materia_prima_id',
  verifyToken,
  registrarBitacora('Consulta del inventario de una materia prima específica'),
  getInventarioMateriaPrimaById
);

// Ruta para obtener el inventario de todas las materias primas
router.get(
  '/',
  verifyToken,
  registrarBitacora('Consulta del inventario de todas las materias primas'),
  getInventarioMateriasPrimas
);

module.exports = router;
