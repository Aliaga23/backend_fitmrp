const { createMovement, getMovements, getMovementsByProductId } = require('../models/movementModel');

// Registrar un movimiento de producto
exports.createMovement = async (req, res) => {
  const { producto_id, lote_id, tipo_movimiento, cantidad, observaciones } = req.body;

  try {
    // Registrar movimiento en la base de datos
    const newMovement = await createMovement(producto_id, lote_id, tipo_movimiento, cantidad, observaciones);
    res.status(201).json(newMovement);
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el movimiento', error: error.message });
  }
};

// Obtener todos los movimientos de productos
exports.getMovements = async (req, res) => {
  try {
    const movements = await getMovements();
    res.status(200).json(movements);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los movimientos', error: error.message });
  }
};

// Obtener los movimientos de un producto específico por ID
exports.getMovementsByProductId = async (req, res) => {
  const { producto_id } = req.params;

  try {
    const movements = await getMovementsByProductId(producto_id);
    if (movements.length === 0) {
      return res.status(404).json({ message: 'No se encontraron movimientos para este producto' });
    }
    res.status(200).json(movements);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los movimientos del producto', error: error.message });
  }
};
