import { z } from 'zod';
import { truckSchema } from './truckSchemas';

export const publicDriversSchema = z.object({
  lat: z.string({ required_error: 'latitude é obrigatória' }).trim(),
  lng: z.string({ required_error: 'longitude é obrigatório' }).trim(),
});

export const driverStoreSchema = z.object({
  fullName: z.string({
    required_error: 'nome completo é um campo obrigatório',
    invalid_type_error: 'nome completo deve ser uma string',
  }),
  birthDate: z.coerce.date({
    required_error: 'data de nascimento é um campo obrigatório',
    invalid_type_error: 'data de nascimento must be a date',
  }),
  cpf: z.string({
    required_error: 'cpf é um campo obrigatório',
    invalid_type_error: 'cpf deve ser uma string',
  }),
  cnhNumber: z.string({
    required_error: 'número da cnh é um campo obrigatório',
    invalid_type_error: 'número da cnh deve ser uma string',
  }),
  cnhCategory: z.string({
    required_error: 'categoria da cnh é um campo obrigatório',
    invalid_type_error: 'categoria da cnh deve ser uma string',
  }),
  rntrc: z.string({
    required_error: 'rntrc é um campo obrigatório',
    invalid_type_error: 'rntrc deve ser uma string',
  }),
  email: z
    .string({
      required_error: 'email é um campo obrigatório',
      invalid_type_error: 'email deve ser uma string',
    })
    .email({
      message: 'email não está no formato correto',
    }),
  phoneNumber: z.string({
    required_error: 'número de telefone é um campo obrigatório',
    invalid_type_error: 'número de telefone deve ser uma string',
  }),
  whatsappNumber: z
    .string({
      invalid_type_error: 'número do whatsapp deve ser uma string',
    })
    .optional(),
  username: z.string({
    required_error: 'nome de usuário é um campo obrigatório',
    invalid_type_error: 'nome de usuário deve ser uma string',
  }),
  password: z.string({
    required_error: 'senha é um campo obrigatório',
    invalid_type_error: 'senha deve ser uma string',
  }),
  truck: truckSchema,
  address: z.object(
    {
      zipcode: z
        .string({
          invalid_type_error: 'CEP deve ser uma string',
        })
        .optional(),
      address: z.string({
        required_error: 'endereço é um campo obrigatório',
        invalid_type_error: 'endereço deve ser uma string',
      }),
      number: z
        .number({
          invalid_type_error: 'número do endereço must be a number',
        })
        .optional(),
      district: z.string({
        required_error: 'bairro é um campo obrigatório',
        invalid_type_error: 'bairro deve ser uma string',
      }),
      reference: z
        .string({
          invalid_type_error: 'referência deve ser uma string',
        })
        .optional(),
      state: z.string({
        required_error: 'estado é um campo obrigatório',
        invalid_type_error: 'estado deve ser uma string',
      }),
      city: z.string({
        required_error: 'cidade é um campo obrigatório',
        invalid_type_error: 'cidade deve ser uma string',
      }),
      latitude: z.number({
        required_error: 'latitude é um campo obrigatório',
        invalid_type_error: 'latitude must be a number',
      }),
      longitude: z.number({
        required_error: 'longitude é um campo obrigatório',
        invalid_type_error: 'longitude must be a number',
      }),
    },
    {
      required_error: 'endereço é um campo obrigatório',
    },
  ),
});

export const updateDriverSchema = z.object({
  fullName: z.string({
    required_error: 'nome completo é um campo obrigatório',
    invalid_type_error: 'nome completo deve ser uma string',
  }),
  birthDate: z.coerce.date({
    required_error: 'data de nascimento é um campo obrigatório',
    invalid_type_error: 'data de nascimento must be a date',
  }),
  cpf: z.string({
    required_error: 'cpf é um campo obrigatório',
    invalid_type_error: 'cpf deve ser uma string',
  }),
  cnhNumber: z.string({
    required_error: 'número da cnh é um campo obrigatório',
    invalid_type_error: 'número da cnh deve ser uma string',
  }),
  cnhCategory: z.string({
    required_error: 'categoria da cnh é um campo obrigatório',
    invalid_type_error: 'categoria da cnh deve ser uma string',
  }),
  rntrc: z.string({
    required_error: 'rntrc é um campo obrigatório',
    invalid_type_error: 'rntrc deve ser uma string',
  }),
  phoneNumber: z.string({
    required_error: 'número de telefone é um campo obrigatório',
    invalid_type_error: 'número de telefone deve ser uma string',
  }),
  whatsappNumber: z
    .string({
      invalid_type_error: 'número do whatsapp deve ser uma string',
    })
    .optional(),
});
