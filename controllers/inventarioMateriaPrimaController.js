const {
    createInventarioMateriaPrima,
    updateInventarioMateriaPrima,
    getInventarioMateriaPrimaById,
    getInventarioMateriasPrimas,
  } = require('../models/inventarioMateriaPrimaModel');
  
  // Crear un nuevo registro de inventario de materia prima
  exports.createInventarioMateriaPrima = async (req, res) => {
    const { materia_prima_id, cantidad_disponible } = req.body;
  
    try {
      const newInventario = await createInventarioMateriaPrima(materia_prima_id, cantidad_disponible);
      res.status(201).json(newInventario);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el inventario de materia prima', error: error.message });
    }
  };
  
  // Actualizar el stock de materia prima (entrada o salida)
  exports.updateInventarioMateriaPrima = async (req, res) => {
    const { materia_prima_id } = req.params;
    const { cantidad, esEntrada } = req.body;
  
    try {
      const updatedInventario = await updateInventarioMateriaPrima(materia_prima_id, cantidad, esEntrada);
      res.status(200).json(updatedInventario);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el inventario de materia prima', error: error.message });
    }
  };
  
  // Obtener el inventario de una materia prima por ID
  exports.getInventarioMateriaPrimaById = async (req, res) => {
    const { materia_prima_id } = req.params;
  
    try {
      const inventario = await getInventarioMateriaPrimaById(materia_prima_id);
      if (!inventario) {
        return res.status(404).json({ message: 'Inventario de materia prima no encontrado' });
      }
      res.status(200).json(inventario);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el inventario de materia prima', error: error.message });
    }
  };
  
  // Obtener el inventario de todas las materias primas
  exports.getInventarioMateriasPrimas = async (req, res) => {
    try {
      const inventarios = await getInventarioMateriasPrimas();
      res.status(200).json(inventarios);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el inventario de materias primas', error: error.message });
    }
  };
  