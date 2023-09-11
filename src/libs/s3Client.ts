import { S3Client } from '@aws-sdk/client-s3';

const bucketRegion = process.env.S3_BUCKET_REGION as string;
const accessKey = process.env.S3_ACCESS_KEY as string;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY as string;

export const s3Client = new S3Client({
  region: bucketRegion,
  useAccelerateEndpoint: true,
  credentials: {
    secretAccessKey,
    accessKeyId: accessKey,
  },
});
