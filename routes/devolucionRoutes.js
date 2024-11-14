// devolucionRoutes.js
const express = require('express');
const router = express.Router();
const devolucionController = require('../controllers/devolucionController');

router.post('/', devolucionController.createDevolucion);
router.get('/', devolucionController.getDevoluciones);
router.get('/:id', devolucionController.getDevolucionById);
router.put('/:id', devolucionController.updateDevolucion);
router.delete('/:id', devolucionController.deleteDevolucion);

module.exports = router;
