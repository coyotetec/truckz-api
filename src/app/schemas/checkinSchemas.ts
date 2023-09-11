import { z } from 'zod';

export const checkinIndexSchema = z.object({
  latitude: z
    .string({
      required_error: 'latitude is a required field',
      invalid_type_error: 'latitude must be a number',
    })
    .transform((v) => parseFloat(v)),
  longitude: z
    .string({
      required_error: 'longitude is a required field',
      invalid_type_error: 'longitude must be a number',
    })
    .transform((v) => parseFloat(v)),
  radius: z
    .string({
      invalid_type_error: 'radius must be a number',
    })
    .optional()
    .default('250')
    .transform((v) => parseFloat(v)),
});

export const checkinStoreSchema = z.object({
  state: z.string({
    required_error: 'state is a required field',
    invalid_type_error: 'state must be a string',
  }),
  city: z.string({
    required_error: 'city is a required field',
    invalid_type_error: 'city must be a string',
  }),
  latitude: z.number({
    required_error: 'latitude is a required field',
    invalid_type_error: 'latitude must be a number',
  }),
  longitude: z.number({
    required_error: 'longitude is a required field',
    invalid_type_error: 'longitude must be a number',
  }),
});
