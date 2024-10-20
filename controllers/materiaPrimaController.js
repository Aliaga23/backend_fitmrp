const {
    createMateriaPrima,
    getMateriasPrimas,
    getMateriaPrimaById,
    updateMateriaPrima,
    deleteMateriaPrima,
  } = require('../models/materiaPrimaModel');
  
  // Crear una nueva materia prima
  exports.createMateriaPrima = async (req, res) => {
    const { nombre, descripcion } = req.body;
    try {
      const newMateriaPrima = await createMateriaPrima(nombre, descripcion);
      res.status(201).json(newMateriaPrima);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear la materia prima' });
    }
  };
  
  // Obtener todas las materias primas
  exports.getMateriasPrimas = async (req, res) => {
    try {
      const materiasPrimas = await getMateriasPrimas();
      res.status(200).json(materiasPrimas);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las materias primas' });
    }
  };
  
  // Obtener una materia prima por ID
  exports.getMateriaPrimaById = async (req, res) => {
    const { id } = req.params;
    try {
      const materiaPrima = await getMateriaPrimaById(id);
      if (!materiaPrima) {
        return res.status(404).json({ message: 'Materia prima no encontrada' });
      }
      res.status(200).json(materiaPrima);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la materia prima' });
    }
  };
  
  // Actualizar una materia prima
  exports.updateMateriaPrima = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    try {
      const updatedMateriaPrima = await updateMateriaPrima(id, nombre, descripcion);
      if (!updatedMateriaPrima) {
        return res.status(404).json({ message: 'Materia prima no encontrada' });
      }
      res.status(200).json(updatedMateriaPrima);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar la materia prima' });
    }
  };
  
  // Eliminar una materia prima
  exports.deleteMateriaPrima = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedMateriaPrima = await deleteMateriaPrima(id);
      if (!deletedMateriaPrima) {
        return res.status(404).json({ message: 'Materia prima no encontrada' });
      }
      res.status(200).json(deletedMateriaPrima);
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar la materia prima' });
    }
  };
  