const ArchivoModel = require('../models/ArchivoModel');
const minioService = require('../services/minioService');

// Subir un archivo a MinIO y guardar los detalles en la base de datos
const uploadFile = async (req, res) => {
    try {
      const { file } = req.files;  // Obtiene el archivo desde la solicitud
  
      // Define los metadatos para MinIO
      const metaData = { 'Content-Type': file.mimetype };
  
      // Subir archivo a MinIO usando el buffer del archivo directamente
      const fileUrl = await minioService.uploadFile(file.name, file.data, metaData);  // Usa file.data para el buffer del archivo
  
      // Guardar los detalles del archivo en la base de datos
      const newArchivo = await ArchivoModel.createArchivo(
        file.name,        // Nombre del archivo
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
  

// Obtener todos los archivos desde la base de datos
const getAllFiles = async (req, res) => {
  try {
    const archivos = await ArchivoModel.getAllArchivos();
    res.status(200).json(archivos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los archivos', error });
  }
};

module.exports = {
  uploadFile,
  getAllFiles,  // Exportamos la nueva función
};
