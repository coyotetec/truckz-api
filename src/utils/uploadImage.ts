import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { minioClient } from '../libs/minioClient';

interface IConfig {
  height?: number;
}

const bucketName = process.env.MINIO_BUCKET as string;

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

  await minioClient.putObject(bucketName, imageName, formattedImage);

  return imageName;
}
