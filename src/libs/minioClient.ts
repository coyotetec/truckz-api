import * as Minio from 'minio';

const endPoint = process.env.MINIO_ENDPOINT as string;
const accessKey = process.env.MINIO_ACCESS_KEY as string;
const secretKey = process.env.MINIO_SECRET_KEY as string;

export const minioClient = new Minio.Client({
  endPoint,
  useSSL: false,
  accessKey,
  secretKey,
});
