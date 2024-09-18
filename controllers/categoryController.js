const { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } = require('../models/categoryModel');

// Crear una nueva categoría
exports.createCategory = async (req, res) => {
  const { nombre } = req.body;
  try {
    const newCategory = await createCategory(nombre);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la categoría' });
  }
};

// Obtener todas las categorías
exports.getCategories = async (req, res) => {
  try {
    const categories = await getCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las categorías' });
  }
};

// Obtener una categoría por ID
exports.getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await getCategoryById(id);
    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la categoría' });
  }
};

// Actualizar una categoría
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const updatedCategory = await updateCategory(id, nombre);
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la categoría' });
  }
};

// Eliminar una categoría
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await deleteCategory(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.status(200).json(deletedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la categoría' });
  }
};
