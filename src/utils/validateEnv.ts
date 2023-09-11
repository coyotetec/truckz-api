import { cleanEnv, port, str } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    DATABASE_URL: str(),
    S3_BUCKET_NAME: str(),
    S3_BUCKET_REGION: str(),
    S3_ACCESS_KEY: str(),
    S3_SECRET_ACCESS_KEY: str(),
    JWT_SECRET: str(),
  });
};

export default validateEnv;
