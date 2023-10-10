import { z } from 'zod';

export const updateUserSchema = z.object({
  email: z
    .string({
      required_error: 'email is a required field',
      invalid_type_error: 'email must be a string',
    })
    .email({
      message: 'email does not have the correct format',
    }),
  username: z.string({
    required_error: 'username is a required field',
    invalid_type_error: 'username must be a string',
  }),
  password: z.string({
    required_error: 'password is a required field',
    invalid_type_error: 'password must be a string',
  }),
});
