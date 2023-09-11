import { ZodError } from 'zod';

export function parseZodErrors(error: ZodError) {
  return error.issues.map((item) => item.message);
}
