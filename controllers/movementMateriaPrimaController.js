const {
    createMovementMateriaPrima,
    getMovementsMateriaPrima,
    getMovementsByMateriaPrimaId,
  } = require('../models/movementMateriaPrimaModel');
  
  // Registrar un movimiento de materia prima
  exports.createMovementMateriaPrima = async (req, res) => {
    const { materia_prima_id, tipo_movimiento, cantidad, observaciones } = req.body;
  
    try {
      // Registrar movimiento en la base de datos
      const newMovement = await createMovementMateriaPrima(materia_prima_id, tipo_movimiento, cantidad, observaciones);
      res.status(201).json(newMovement);
    } catch (error) {
      res.status(500).json({ message: 'Error al registrar el movimiento de materia prima', error: error.message });
    }
  };
  
  // Obtener todos los movimientos de materia prima
  exports.getMovementsMateriaPrima = async (req, res) => {
    try {
      const movements = await getMovementsMateriaPrima();
      res.status(200).json(movements);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los movimientos de materia prima', error: error.message });
    }
  };
  
  // Obtener los movimientos de una materia prima específica por ID
  exports.getMovementsByMateriaPrimaId = async (req, res) => {
    const { materia_prima_id } = req.params;
  
    try {
      const movements = await getMovementsByMateriaPrimaId(materia_prima_id);
      if (movements.length === 0) {
        return res.status(404).json({ message: 'No se encontraron movimientos para esta materia prima' });
      }
      res.status(200).json(movements);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los movimientos de la materia prima', error: error.message });
    }
  };
  