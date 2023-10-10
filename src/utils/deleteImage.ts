import { s3Client } from '../libs/s3Client';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';

const bucketName = process.env.S3_BUCKET_NAME as string;

export async function deleteImage(imageName: string) {
  const deleteCommand = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: imageName,
  });

  await s3Client.send(deleteCommand);
}
