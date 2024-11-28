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

const uploadFile = async (fileName, fileBuffer, metaData) => {
  const fileUrl = `${Date.now()}_${fileName}`;

  const bucketExists = await minioClient.bucketExists(bucketName);
  if (!bucketExists) {
    await minioClient.makeBucket(bucketName, 'us-east-1');
  }

  // Subir el archivo a MinIO usando el buffer del archivo
  await minioClient.putObject(bucketName, fileName, fileBuffer, metaData);

  // Generar la URL pública del archivo subido
  const urlArchivo = `https://bucket-production-96ac.up.railway.app/${bucketName}/${fileName}`;
  return urlArchivo;
};

module.exports = { uploadFile };
