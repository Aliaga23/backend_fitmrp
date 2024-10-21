const ProductoArchivoModel = require('../models/ProductoArchivoModel');

// Asociar un archivo con un producto
const associateArchivoWithProducto = async (req, res) => {
  try {
    const { productoId, archivoId } = req.body;

    // Asociar archivo con producto
    const association = await ProductoArchivoModel.associateArchivoWithProducto(productoId, archivoId);

    res.status(200).json({
      message: 'Archivo asociado con éxito',
      association,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al asociar archivo con producto', error });
  }
};

module.exports = {
  associateArchivoWithProducto,
};
