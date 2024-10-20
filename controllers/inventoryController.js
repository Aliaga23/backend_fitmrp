const {
  createInventory,
  updateInventory,
  getInventoryById,
  getInventories,
} = require('../models/inventoryModel');

// Crear un nuevo registro de inventario para un producto
exports.createInventory = async (req, res) => {
  const { producto_id, cantidad_disponible } = req.body;

  try {
    const newInventory = await createInventory(producto_id, cantidad_disponible);
    res.status(201).json(newInventory);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el inventario del producto', error: error.message });
  }
};

// Actualizar el stock de un producto (entrada o salida)
exports.updateInventory = async (req, res) => {
  const { producto_id } = req.params;
  const { cantidad, esEntrada } = req.body;

  try {
    const updatedInventory = await updateInventory(producto_id, cantidad, esEntrada);
    res.status(200).json(updatedInventory);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el inventario del producto', error: error.message });
  }
};

// Obtener el inventario de un producto por ID
exports.getInventoryById = async (req, res) => {
  const { producto_id } = req.params;

  try {
    const inventory = await getInventoryById(producto_id);
    if (!inventory) {
      return res.status(404).json({ message: 'Inventario del producto no encontrado' });
    }
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el inventario del producto', error: error.message });
  }
};

// Obtener el inventario de todos los productos
exports.getInventories = async (req, res) => {
  try {
    const inventories = await getInventories();
    res.status(200).json(inventories);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el inventario de productos', error: error.message });
  }
};
