import { z } from 'zod';

export const addressSchema = z.object({
  name: z.string({
    required_error: 'name is a required field',
  }),
  zipcode: z
    .string({
      invalid_type_error: 'zipcode must be a string',
    })
    .optional(),
  address: z.string({
    required_error: 'address is a required field',
    invalid_type_error: 'address must be a string',
  }),
  number: z
    .number({
      invalid_type_error: 'number must be a number',
    })
    .optional(),
  district: z.string({
    required_error: 'district is a required field',
    invalid_type_error: 'district must be a string',
  }),
  reference: z
    .string({
      invalid_type_error: 'reference must be a string',
    })
    .optional(),
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
