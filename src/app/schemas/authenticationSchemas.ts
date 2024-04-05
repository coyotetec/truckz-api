import { z } from 'zod';

export const loginSchema = z
  .object({
    cnpj: z
      .string({
        invalid_type_error: 'cnpj deve ser uma string',
      })
      .optional(),
    cpf: z
      .string({
        invalid_type_error: 'cpf deve ser uma string',
      })
      .optional(),
    username: z
      .string({
        invalid_type_error: 'Nome do usuário deve ser uma string',
      })
      .optional(),
    password: z.string({
      required_error: 'senha é um campo obrigatório',
      invalid_type_error: 'senha deve ser uma string',
    }),
  })
  .superRefine((val, ctx) => {
    if (!val.cpf && !val.cnpj && !val.username) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          'você precisa fornecer pelo menos um deles: cpf, cnpj, nome de usuário',
      });
    }
  });

export const requestResetSchema = z
  .object({
    cnpj: z
      .string({
        invalid_type_error: 'cnpj deve ser uma string',
      })
      .optional(),
    cpf: z
      .string({
        invalid_type_error: 'cpf deve ser uma string',
      })
      .optional(),
    username: z
      .string({
        invalid_type_error: 'Nome de usuário deve ser uma string',
      })
      .optional(),
  })
  .superRefine((val, ctx) => {
    if (!val.cpf && !val.cnpj && !val.username) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          'você precisa fornecer pelo menos um deles: cpf, cnpj, nome de usuário',
      });
    }
  });

export const resetPasswordSchema = z.object({
  userId: z
    .string({
      required_error: 'userId é um campo obrigatório',
      invalid_type_error: 'userId deve ser uma string',
    })
    .uuid({
      message: 'userId deve ser no formato UUID',
    }),
  token: z.string({
    required_error: 'token é um campo obrigatório',
    invalid_type_error: 'token deve ser uma string',
  }),
  password: z.string({
    required_error: 'senha é um campo obrigatório',
    invalid_type_error: 'senha deve ser uma string',
  }),
});
