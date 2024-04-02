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

export const requestResetSchema = z
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
  })
  .superRefine((val, ctx) => {
    if (!val.cpf && !val.cnpj && !val.username) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'you need provide at least one of them: cpf, cnpj, username',
      });
    }
  });

export const resetPasswordSchema = z.object({
  userId: z
    .string({
      required_error: 'userId is a required field',
      invalid_type_error: 'userId must be a string',
    })
    .uuid({
      message: 'userId must be an UUID',
    }),
  token: z.string({
    required_error: 'token is a required field',
    invalid_type_error: 'token must be a string',
  }),
  password: z.string({
    required_error: 'password is a required field',
    invalid_type_error: 'password must be a string',
  }),
});
