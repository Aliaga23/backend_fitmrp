const express = require('express');
const router = express.Router();
const devolucionController = require('../controllers/devolucionController');
const { verifyToken } = require('../middlewares/authMiddleware');
const registrarBitacora = require('../middlewares/bitacoraMiddleware');

// Ruta para crear una devolución
router.post(
  '/',
  verifyToken,
  registrarBitacora('Creación de una devolución'),
  devolucionController.createDevolucion
);

// Ruta para obtener todas las devoluciones
router.get(
  '/',
  verifyToken,
  registrarBitacora('Consulta de todas las devoluciones'),
  devolucionController.getDevoluciones
);

// Ruta para obtener una devolución por ID
router.get(
  '/:id',
  verifyToken,
  registrarBitacora('Consulta de una devolución por ID'),
  devolucionController.getDevolucionById
);

// Ruta para actualizar una devolución por ID
router.put(
  '/:id',
  verifyToken,
  registrarBitacora('Actualización de una devolución'),
  devolucionController.updateDevolucion
);

// Ruta para eliminar una devolución por ID
router.delete(
  '/:id',
  verifyToken,
  registrarBitacora('Eliminación de una devolución'),
  devolucionController.deleteDevolucion
);

module.exports = router;
