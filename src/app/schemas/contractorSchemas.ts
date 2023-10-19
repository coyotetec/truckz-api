import { z } from 'zod';
import { addressSchema } from './addressSchemas';

export const contractorStoreSchema = z.object({
  name: z.string({
    required_error: 'name is a required field',
    invalid_type_error: 'name must be a string',
  }),
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
  stateRegistration: z.string({
    required_error: 'stateRegistration is a required field',
    invalid_type_error: 'stateRegistration must be a string',
  }),
  email: z
    .string({
      required_error: 'email is a required field',
      invalid_type_error: 'email must be a string',
    })
    .email({
      message: 'email does not have the correct format',
    }),
  phoneNumber: z.string({
    required_error: 'phoneNumber is a required field',
    invalid_type_error: 'phoneNumber must be a string',
  }),
  whatsappNumber: z
    .string({
      invalid_type_error: 'whatsappNumber must be a string',
    })
    .optional(),
  username: z.string({
    required_error: 'username is a required field',
    invalid_type_error: 'username must be a string',
  }),
  password: z.string({
    required_error: 'password is a required field',
    invalid_type_error: 'password must be a string',
  }),
  address: addressSchema,
});

export const updateContratorSchema = z.object({
  name: z.string({
    required_error: 'name is a required field',
    invalid_type_error: 'name must be a string',
  }),
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
  stateRegistration: z.string({
    required_error: 'stateRegistration is a required field',
    invalid_type_error: 'stateRegistration must be a string',
  }),
  phoneNumber: z.string({
    required_error: 'phoneNumber is a required field',
    invalid_type_error: 'phoneNumber must be a string',
  }),
  whatsappNumber: z
    .string({
      invalid_type_error: 'whatsappNumber must be a string',
    })
    .optional(),
});
