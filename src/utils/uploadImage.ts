import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '../libs/s3Client';

interface IConfig {
  height?: number;
}

const bucketName = process.env.S3_BUCKET_NAME as string;

export async function uploadImage(
  image: Express.Multer.File,
  config?: IConfig,
) {
  const imageName = uuidv4();
  const formattedImage = await sharp(image.buffer)
    .resize({
      ...(config?.height && { height: config.height }),
    })
    .toBuffer();

  const putCommand = new PutObjectCommand({
    Bucket: bucketName,
    Key: imageName,
    Body: formattedImage,
    ContentType: image.mimetype,
  });

  await s3Client.send(putCommand);

  return imageName;
}
