export {};

declare global {
  namespace Express {
    export interface Request {
      userId?: string;
      accountType?: 'driver' | 'contractor' | 'undefined';
    }
  }
}
