import { z } from 'zod';
import { addressSchema } from './addressSchemas';

export const loadCloseStatus = z.enum(['cancelled', 'finished'], {
  required_error: 'status is a required field',
  invalid_type_error: 'status must be cancelled or finished',
});

export const loadStoreSchema = z
  .object({
    title: z
      .string({
        invalid_type_error: 'title must be a string',
      })
      .optional(),
    price: z.number({
      required_error: 'price is a required field',
      invalid_type_error: 'price must be a number',
    }),
    length: z
      .number({
        invalid_type_error: 'length must be a number',
      })
      .optional(),
    width: z
      .number({
        invalid_type_error: 'length must be a number',
      })
      .optional(),
    height: z
      .number({
        invalid_type_error: 'length must be a number',
      })
      .optional(),
    dimensionsUnit: z
      .enum(['centimeters', 'meters'], {
        invalid_type_error: 'dimensionsUnit must be: centimeters, meters',
      })
      .optional(),
    weight: z
      .number({
        invalid_type_error: 'length must be a number',
      })
      .optional(),
    weightUnit: z
      .enum(['grams', 'kilograms', 'tons'], {
        invalid_type_error: 'weightUnit must be: grams, kilograms, tons',
      })
      .optional(),
    pickupAddressId: z
      .string({
        invalid_type_error: 'pickupAddressId must be a string',
      })
      .uuid({
        message: 'pickupAddressId must be a uuid',
      })
      .optional(),
    description: z
      .string({
        invalid_type_error: 'description must be a string',
      })
      .optional(),
    pickupAddress: addressSchema.optional(),
    pickupDate: z.coerce.date({
      required_error: 'pickupDate is a required field',
      invalid_type_error: 'pickupDate must be a date',
    }),
    deliveryAddressId: z
      .string({
        invalid_type_error: 'deliveryAddressId must be a string',
      })
      .uuid({
        message: 'deliveryAddress.id must be a uuid',
      })
      .optional(),
    deliveryAddress: addressSchema.optional(),
    deliveryDate: z.coerce.date({
      required_error: 'deliveryDate is a required field',
      invalid_type_error: 'deliveryDate must be a date',
    }),
  })
  .superRefine((val, ctx) => {
    if (!val.deliveryAddressId && !val.deliveryAddress) {
      ctx.addIssue({
        message: 'you need to send deliveryAddress or deliveryAddressId',
        code: z.ZodIssueCode.custom,
      });
    }
    if (!val.pickupAddressId && !val.pickupAddress) {
      ctx.addIssue({
        message: 'you need to send pickupAddress or pickupAddressId',
        code: z.ZodIssueCode.custom,
      });
    }
  });
