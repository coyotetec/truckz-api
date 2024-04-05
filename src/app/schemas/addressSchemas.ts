import { z } from 'zod';

export const addressSchema = z.object({
  name: z.string({
    required_error: 'Nome é um campo obrigatório',
  }),
  zipcode: z
    .string({
      invalid_type_error: 'CEP deve ser uma string',
    })
    .optional(),
  address: z.string({
    required_error: 'Endereço é um campo obrigatório',
    invalid_type_error: 'Endereço deve ser uma string',
  }),
  number: z
    .number({
      invalid_type_error: 'Número deve ser do tipo number',
    })
    .optional(),
  district: z.string({
    required_error: 'Bairro é um campo obrigatório',
    invalid_type_error: 'Bairro deve ser uma string',
  }),
  reference: z
    .string({
      invalid_type_error: 'Referência deve ser uma string',
    })
    .optional(),
  state: z.string({
    required_error: 'Estado é um campo obrigatório',
    invalid_type_error: 'Estado deve ser uma string',
  }),
  city: z.string({
    required_error: 'Cidade é um campo obrigatório',
    invalid_type_error: 'Cidade deve ser uma string',
  }),
  latitude: z.number({
    required_error: 'latitude é um campo obrigatório',
    invalid_type_error: 'latitude deve ser um número',
  }),
  longitude: z.number({
    required_error: 'longitude é um campo obrigatório',
    invalid_type_error: 'longitude deve ser um número',
  }),
});
