import { z } from 'zod';

export const AddressSchema = z.object({
  name: z.string({
    required_error: 'name is a required field',
  }),
  zipcode: z
    .string({
      invalid_type_error: 'zipcode must be a string',
    })
    .optional(),
  address: z.string({
    required_error: 'pickupAddress.address is a required field',
    invalid_type_error: 'pickupAddress.address must be a string',
  }),
  number: z
    .number({
      invalid_type_error: 'pickupAddress.number must be a number',
    })
    .optional(),
  district: z.string({
    required_error: 'pickupAddress.district is a required field',
    invalid_type_error: 'pickupAddress.district must be a string',
  }),
  reference: z
    .string({
      invalid_type_error: 'pickupAddress.reference must be a string',
    })
    .optional(),
  state: z.string({
    required_error: 'pickupAddress.state is a required field',
    invalid_type_error: 'pickupAddress.state must be a string',
  }),
  city: z.string({
    required_error: 'pickupAddress.city is a required field',
    invalid_type_error: 'pickupAddress.city must be a string',
  }),
  latitude: z.number({
    required_error: 'pickupAddress.latitude is a required field',
    invalid_type_error: 'pickupAddress.latitude must be a number',
  }),
  longitude: z.number({
    required_error: 'pickupAddress.longitude is a required field',
    invalid_type_error: 'pickupAddress.longitude must be a number',
  }),
});
