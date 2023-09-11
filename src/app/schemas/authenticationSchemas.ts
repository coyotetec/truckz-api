import { z } from 'zod';

export const loginSchema = z
  .object({
    cnpj: z
      .string({
        invalid_type_error: 'cnpj must be a string',
      })
      .optional(),
    cpf: z
      .string({
        invalid_type_error: 'cpf must be a string',
      })
      .optional(),
    username: z
      .string({
        invalid_type_error: 'username must be a string',
      })
      .optional(),
    password: z.string({
      required_error: 'password is a required field',
      invalid_type_error: 'password must be a string',
    }),
  })
  .superRefine((val, ctx) => {
    if (!val.cpf && !val.cnpj && !val.username) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'you need provide at least one of them: cpf, cnpj, username',
      });
    }
  });
