import { z } from 'zod';

export const driverStoreSchema = z.object({
  fullName: z.string({
    required_error: 'name is a required field',
    invalid_type_error: 'name must be a string',
  }),
  birthDate: z.string({
    required_error: 'birthDate is a required field',
    invalid_type_error: 'birthDate must be a string',
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
  truck: z.object(
    {
      renavam: z.string({
        required_error: 'truck.renavam is a required field',
        invalid_type_error: 'truck.renavam must be a string',
      }),
      plate: z.string({
        required_error: 'truck.plate is a required field',
        invalid_type_error: 'truck.plate must be a string',
      }),
      crvNumber: z.string({
        required_error: 'truck.crvNumber is a required field',
        invalid_type_error: 'truck.crvNumber must be a string',
      }),
      model: z.string({
        required_error: 'truck.model is a required field',
        invalid_type_error: 'truck.model must be a string',
      }),
      holderName: z.string({
        required_error: 'truck.holderName is a required field',
        invalid_type_error: 'truck.holderName must be a string',
      }),
      holderCpf: z
        .string({
          invalid_type_error: 'truck.holderCpf must be a string',
        })
        .optional(),
      holderCnpj: z
        .string({
          invalid_type_error: 'truck.holderCnpj must be a string',
        })
        .optional(),
      type: z.enum([
        'bau',
        'bau_frigorifico',
        'sider',
        'cacamba',
        'grade_baixa',
        'graneleiro',
        'prancha',
      ]),
      axlesQty: z.number({
        required_error: 'truck.axlesQty is a required field',
        invalid_type_error: 'truck.axlesQty must be a number',
      }),
      tracker: z.boolean({
        required_error: 'truck.tracker is a required field',
        invalid_type_error: 'truck.tracker must be a boolean',
      }),
    },
    {
      required_error: 'truck is a required field',
    },
  ),
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
