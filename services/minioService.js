const Minio = require('minio');
const path = require('path');
const fs = require('fs');

// Definimos el endpoint
const minioEndpoint = process.env.MINIO_ENDPOINT || 'bucket-production-96ac.up.railway.app';

// Configura el cliente MinIO usando las variables de entorno
const minioClient = new Minio.Client({
  endPoint: minioEndpoint,  // Usamos la variable minioEndpoint
  port: parseInt(process.env.MINIO_PORT, 10) || 443,
  useSSL: true,  // Asegúrate de que esté en true porque estás usando HTTPS
  accessKey: process.env.MINIO_ACCESS_KEY || 'ftyahNvc0fDokIn88yE6',
  secretKey: process.env.MINIO_SECRET_KEY || 'zXKrdbZPtLaKVw85e2D0hd6UJTQHgvX3zeVuZ4bE',
});

const bucketName = process.env.MINIO_BUCKET || 'imagenes';

// Función para verificar la conexión
const testConnection = async () => {
  try {
    const buckets = await minioClient.listBuckets();
    console.log('Buckets disponibles:', buckets);
  } catch (error) {
    console.error('Error al conectarse a MinIO:', error);
  }
};

// Llama a la función de prueba para verificar la conexión
testConnection();

// Función para subir archivos
const uploadFile = async (fileName, filePath, metaData) => {
  try {
    // Verifica si el bucket existe, si no lo crea
    const bucketExists = await minioClient.bucketExists(bucketName);
    if (!bucketExists) {
      await minioClient.makeBucket(bucketName, 'us-east-1');  // Cambia la región si es necesario
    }

    // Sube el archivo
    await minioClient.fPutObject(bucketName, fileName, filePath, metaData);

    // Devuelve la URL pública del archivo
    const fileUrl = `https://${minioEndpoint}/${bucketName}/${fileName}`;
    return fileUrl;
  } catch (error) {
    throw error;
  }
};
/*
// Ejemplo de uso para subir un archivo
const testUpload = async () => {
  const fileName = 'test-image.jpg';  // Nombre del archivo en MinIO
  const filePath = path.join(__dirname, fileName);  // Ruta del archivo local

  // Crear un archivo de prueba
  fs.writeFileSync(filePath, 'Este es un archivo de prueba para MinIO.');

  try {
    const fileUrl = await uploadFile(fileName, filePath, {
      'Content-Type': 'image/jpeg',
    });
    console.log('Archivo subido correctamente:', fileUrl);
  } catch (error) {
    console.error('Error al subir el archivo:', error);
  } finally {
    // Elimina el archivo de prueba
    fs.unlinkSync(filePath);
  }
};

// Llama a la función de prueba para subir un archivo
testUpload();
*/
module.exports = {
  uploadFile,
};
