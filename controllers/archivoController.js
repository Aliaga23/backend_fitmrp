const ArchivoModel = require('../models/ArchivoModel');
const minioService = require('../services/minioService');
const path = require('path');

// Subir un archivo a MinIO y guardar los detalles en la base de datos
const uploadFile = async (req, res) => {
  try {
    const { file } = req.files;  // Obtiene el archivo desde la solicitud
    const filePath = path.join(__dirname, '../uploads/', file.name);  // Ruta temporal (asegúrate de que el directorio exista o crea uno)

    // Define los metadatos para MinIO
    const metaData = { 'Content-Type': file.mimetype };

    // Subir archivo a MinIO y obtener la URL pública
    const fileUrl = await minioService.uploadFile(file.name, filePath, metaData);

    // Guardar los detalles del archivo en la base de datos
    const newArchivo = await ArchivoModel.createArchivo(
      file.name,        // Nombre del archivo
      filePath,         // Ruta local del archivo
      file.mimetype,    // Tipo de archivo
      new Date(),       // Fecha de subida
      fileUrl           // URL pública del archivo en MinIO
    );

    // Responder con los detalles del archivo subido
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
