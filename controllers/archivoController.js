const ArchivoModel = require('../models/ArchivoModel');
const minioService = require('../services/minioService');
const path = require('path');

// Subir un archivo a MinIO y guardar los detalles en la base de datos
const uploadFile = async (req, res) => {
  try {
    const { file } = req.files;  // Archivo desde la solicitud
    const filePath = path.join(__dirname, '../uploads/', file.name);  // Ruta temporal
    const metaData = { 'Content-Type': file.mimetype };

    // Subir archivo a MinIO
    const fileUrl = await minioService.uploadFile(file.name, filePath, metaData);

    // Insertar detalles del archivo en la base de datos
    const newArchivo = await ArchivoModel.createArchivo(
      file.name,
      filePath,  // Ruta local del archivo
      file.mimetype,
      new Date(),
      fileUrl  // URL pública del archivo en MinIO
    );

    res.status(200).json({
      message: 'Archivo subido con éxito',
      archivo: newArchivo,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al subir archivo', error });
  }
};

module.exports = {
  uploadFile,
};
