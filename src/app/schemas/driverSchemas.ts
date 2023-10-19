import { z } from 'zod';
import { truckSchema } from './truckSchemas';
import { addressSchema } from './addressSchemas';

export const driverStoreSchema = z.object({
  fullName: z.string({
    required_error: 'fullName is a required field',
    invalid_type_error: 'fullName must be a string',
  }),
  birthDate: z.coerce.date({
    required_error: 'birthDate is a required field',
    invalid_type_error: 'birthDate must be a date',
  }),
  cpf: z.string({
    required_error: 'cpf is a required field',
    invalid_type_error: 'cpf must be a string',
  }),
  cnhNumber: z.string({
    required_error: 'cnhNumber is a required field',
    invalid_type_error: 'cnhNumber must be a string',
  }),
  cnhCategory: z.string({
    required_error: 'cnhCategory is a required field',
    invalid_type_error: 'cnhCategory must be a string',
  }),
  rntrc: z.string({
    required_error: 'rntrc is a required field',
    invalid_type_error: 'rntrc must be a string',
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
  truck: truckSchema,
  address: addressSchema,
});

export const updateDriverSchema = z.object({
  fullName: z.string({
    required_error: 'fullName is a required field',
    invalid_type_error: 'fullName must be a string',
  }),
  birthDate: z.coerce.date({
    required_error: 'birthDate is a required field',
    invalid_type_error: 'birthDate must be a date',
  }),
  cpf: z.string({
    required_error: 'cpf is a required field',
    invalid_type_error: 'cpf must be a string',
  }),
  cnhNumber: z.string({
    required_error: 'cnhNumber is a required field',
    invalid_type_error: 'cnhNumber must be a string',
  }),
  cnhCategory: z.string({
    required_error: 'cnhCategory is a required field',
    invalid_type_error: 'cnhCategory must be a string',
  }),
  rntrc: z.string({
    required_error: 'rntrc is a required field',
    invalid_type_error: 'rntrc must be a string',
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
