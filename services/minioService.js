const Minio = require('minio');

// Configura el cliente MinIO usando las variables de entorno
const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || 'bucket-production-96ac.up.railway.app',
  port: parseInt(process.env.MINIO_PORT, 10) || 443,
  useSSL: true,  // Asegúrate de que esté en true porque estás usando HTTPS
  accessKey: process.env.MINIO_ACCESS_KEY || '3xxAZAzlN0fUpJ4uY2NPyuMaVIAGjF5j',
  secretKey: process.env.MINIO_SECRET_KEY || 'LIcBgbY9ryWTLy48HyRqYQ6H9ir1ExTOCre8G67WbB3CzAv',
});

const bucketName = process.env.MINIO_BUCKET || 'my-bucket';

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
    const fileUrl = `https://${minioClient.host}:${minioClient.port}/${bucketName}/${fileName}`;
    return fileUrl;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  uploadFile,
};
