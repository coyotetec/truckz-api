import { NextFunction, Request, Response } from 'express';
import { AuthError } from '../errors/AuthError';
import jwt from 'jsonwebtoken';

export function authentication(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AuthError('no authorization header found');
  }

  const token = authorization && authorization.split(' ')[1];

  if (!token) {
    throw new AuthError('invalid authentication token');
  }

  try {
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret) as {
      id: string;
      accountType: 'driver' | 'contractor' | 'undefined';
    };

    req.userId = decoded.id;
    req.accountType = decoded.accountType;

    next();
  } catch {
    throw new AuthError('invalid authentication token');
  }
}
