import { z } from 'zod';

export const updateUserSchema = z.object({
  email: z
    .string({
      required_error: 'email é um campo obrigatório',
      invalid_type_error: 'email deve ser uma string',
    })
    .email({
      message: 'email does not have the correct format',
    }),
  username: z.string({
    required_error: 'username é um campo obrigatório',
    invalid_type_error: 'username deve ser uma string',
  }),
  password: z
    .string({
      required_error: 'password é um campo obrigatório',
      invalid_type_error: 'password deve ser uma string',
    })
    .optional(),
});
