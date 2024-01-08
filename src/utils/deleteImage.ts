import { minioClient } from '../libs/minioClient';

const bucketName = process.env.MINIO_BUCKET as string;

export async function deleteImage(imageName: string) {
  await minioClient.removeObject(bucketName, imageName);
}
