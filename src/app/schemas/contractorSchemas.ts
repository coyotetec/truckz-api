import { z } from 'zod';

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
  address: z.object(
    {
      zipcode: z
        .string({
          invalid_type_error: 'zipcode must be a string',
        })
        .optional(),
      address: z.string({
        required_error: 'address.address is a required field',
        invalid_type_error: 'address.address must be a string',
      }),
      number: z
        .number({
          invalid_type_error: 'address.number must be a number',
        })
        .optional(),
      district: z.string({
        required_error: 'address.district is a required field',
        invalid_type_error: 'address.district must be a string',
      }),
      reference: z
        .string({
          invalid_type_error: 'address.reference must be a string',
        })
        .optional(),
      state: z.string({
        required_error: 'address.state is a required field',
        invalid_type_error: 'address.state must be a string',
      }),
      city: z.string({
        required_error: 'address.city is a required field',
        invalid_type_error: 'address.city must be a string',
      }),
      latitude: z.number({
        required_error: 'address.latitude is a required field',
        invalid_type_error: 'address.latitude must be a number',
      }),
      longitude: z.number({
        required_error: 'address.longitude is a required field',
        invalid_type_error: 'address.longitude must be a number',
      }),
    },
    {
      required_error: 'address is a required field',
    },
  ),
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
