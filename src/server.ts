import 'dotenv/config';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import validateEnv from './utils/validateEnv';
import { router } from './router';
import { ZodError } from 'zod';
import { parseZodErrors } from './utils/parseZodErrors';
import { APPError } from './app/errors/APPError';
import { AuthError } from './app/errors/AuthError';

validateEnv();

const app = express();
const port = process.env.PORT || 3003;

app.use(cors());
app.use(morgan('tiny'));
app.use(helmet());
app.use(express.json());
app.use(router);
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ZodError) {
    return res.status(400).json({ error: parseZodErrors(error) });
  }

  if (error instanceof APPError) {
    return res.status(400).json({ error: error.message });
  }

  if (error instanceof AuthError) {
    return res.status(401).json({ error: error.message });
  }

  console.log(error);

  res.sendStatus(500);
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
