const Minio = require('minio');

// Configura el cliente MinIO usando las variables de entorno
const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || 'bucket-production-96ac.up.railway.app',
  port: parseInt(process.env.MINIO_PORT, 10) || 443,
  useSSL: true,
  accessKey: process.env.MINIO_ACCESS_KEY || 'ftyahNvc0fDokIn88yE6',
  secretKey: process.env.MINIO_SECRET_KEY || 'zXKrdbZPtLaKVw85e2D0hd6UJTQHgvX3zeVuZ4bE',
});

const bucketName = process.env.MINIO_BUCKET || 'imagenes';

// Función para subir archivos a MinIO
const uploadFile = async (fileName, filePath, metaData) => {
  const fileUrl = `${Date.now()}_${fileName}`;

  // Verifica si el bucket existe, si no lo crea
  const bucketExists = await minioClient.bucketExists(bucketName);
  if (!bucketExists) {
    await minioClient.makeBucket(bucketName, 'us-east-1');
  }

  // Subir el archivo a MinIO
  await minioClient.fPutObject(bucketName, fileName, filePath, metaData);

  // Generar la URL pública del archivo subido
  const urlArchivo = `https://${minioClient.endPoint}/${bucketName}/${fileName}`;
  return urlArchivo;
};

module.exports = { uploadFile };
