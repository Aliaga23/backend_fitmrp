const { createInventory, getInventories, getInventoryById, updateInventory, deleteInventory } = require('../models/inventoryModel');

// Crear un registro de inventario
exports.createInventory = async (req, res) => {
  const { producto_id, cantidad_disponible } = req.body;
  try {
    const newInventory = await createInventory(producto_id, cantidad_disponible);
    res.status(201).json(newInventory);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el registro de inventario', error: error.message });
  }
};

// Obtener todos los registros de inventario
exports.getInventories = async (req, res) => {
  try {
    const inventories = await getInventories();
    res.status(200).json(inventories);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los registros de inventario', error: error.message });
  }
};

// Obtener un registro de inventario por ID
exports.getInventoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const inventory = await getInventoryById(id);
    if (!inventory) {
      return res.status(404).json({ message: 'Inventario no encontrado' });
    }
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el registro de inventario', error: error.message });
  }
};

// Actualizar un registro de inventario
exports.updateInventory = async (req, res) => {
  const { id } = req.params;
  const { cantidad_disponible } = req.body;
  try {
    const updatedInventory = await updateInventory(id, cantidad_disponible);
    if (!updatedInventory) {
      return res.status(404).json({ message: 'Inventario no encontrado' });
    }
    res.status(200).json(updatedInventory);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el registro de inventario', error: error.message });
  }
};

// Eliminar un registro de inventario
exports.deleteInventory = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedInventory = await deleteInventory(id);
    if (!deletedInventory) {
      return res.status(404).json({ message: 'Inventario no encontrado' });
    }
    res.status(200).json(deletedInventory);
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el registro de inventario', error: error.message });
  }
};
const { createMovement } = require('../models/movementModel');

// Registrar una entrada en el inventario (compra)
exports.registrarEntradaInventario = async (req, res) => {
  const { producto_id, cantidad_ingresada } = req.body;

  try {
    const inventario = await getInventoryByProductId(producto_id);

    if (!inventario) {
      return res.status(404).json({ message: 'Producto no encontrado en inventario' });
    }

    // Actualizar el inventario
    const nuevaCantidad = inventario.cantidad_disponible + cantidad_ingresada;
    await updateInventory(inventario.id, nuevaCantidad);

    // Registrar movimiento de entrada
    await createMovement(producto_id, null, 'entrada', cantidad_ingresada, 'Compra de productos');

    res.status(200).json({ message: 'Entrada registrada y stock actualizado', nuevaCantidad });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar la entrada en inventario', error: error.message });
  }
};

// Registrar una salida en el inventario (venta)
exports.registrarSalidaInventario = async (req, res) => {
  const { producto_id, cantidad_vendida } = req.body;

  try {
    const inventario = await getInventoryByProductId(producto_id);

    if (!inventario) {
      return res.status(404).json({ message: 'Producto no encontrado en inventario' });
    }

    if (inventario.cantidad_disponible < cantidad_vendida) {
      return res.status(400).json({ message: 'No hay suficiente stock disponible' });
    }

    // Actualizar el inventario
    const nuevaCantidad = inventario.cantidad_disponible - cantidad_vendida;
    await updateInventory(inventario.id, nuevaCantidad);

    // Registrar movimiento de salida
    await createMovement(producto_id, null, 'salida', cantidad_vendida, 'Venta de productos');

    res.status(200).json({ message: 'Venta registrada y stock actualizado', nuevaCantidad });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar la salida en inventario', error: error.message });
  }
};