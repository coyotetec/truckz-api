import { z } from 'zod';

export const checkinIndexSchema = z.object({
  latitude: z
    .string({
      required_error: 'latitude é um campo obrigatório',
      invalid_type_error: 'latitude deve ser do tipo number',
    })
    .transform((v) => parseFloat(v)),
  longitude: z
    .string({
      required_error: 'longitude é um campo obrigatório',
      invalid_type_error: 'longitude deve ser do tipo number',
    })
    .transform((v) => parseFloat(v)),
  radius: z
    .string({
      invalid_type_error: 'raio deve ser do tipo number',
    })
    .optional()
    .default('250')
    .transform((v) => parseFloat(v)),
});

export const checkinStoreSchema = z.object({
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
    invalid_type_error: 'latitude deve ser do tipo number',
  }),
  longitude: z.number({
    required_error: 'longitude é um campo obrigatório',
    invalid_type_error: 'longitude deve ser do tipo number',
  }),
});
