import { cleanEnv, port, str, url } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    DATABASE_URL: str(),
    JWT_SECRET: str(),
    MINIO_ENDPOINT: str(),
    MINIO_ACCESS_KEY: str(),
    MINIO_SECRET_KEY: str(),
    MINIO_BUCKET: str(),
    STORAGE_BASE_URL: url(),
  });
};

export default validateEnv;
