import { z } from 'zod';

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
    pickupAddress: z.object({
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
    }),
    pickupDate: z.date({
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
    deliveryAddress: z
      .object({
        zipcode: z
          .string({
            invalid_type_error: 'deliveryAddress.zipcode must be a string',
          })
          .optional(),
        address: z.string({
          required_error: 'deliveryAddress.address is a required field',
          invalid_type_error: 'deliveryAddress.address must be a string',
        }),
        number: z
          .number({
            invalid_type_error: 'deliveryAddress.number must be a number',
          })
          .optional(),
        district: z.string({
          required_error: 'deliveryAddress.district is a required field',
          invalid_type_error: 'deliveryAddress.district must be a string',
        }),
        reference: z
          .string({
            invalid_type_error: 'deliveryAddress.reference must be a string',
          })
          .optional(),
        state: z.string({
          required_error: 'deliveryAddress.state is a required field',
          invalid_type_error: 'deliveryAddress.state must be a string',
        }),
        city: z.string({
          required_error: 'deliveryAddress.city is a required field',
          invalid_type_error: 'deliveryAddress.city must be a string',
        }),
        latitude: z.number({
          required_error: 'deliveryAddress.latitude is a required field',
          invalid_type_error: 'deliveryAddress.latitude must be a number',
        }),
        longitude: z.number({
          required_error: 'deliveryAddress.longitude is a required field',
          invalid_type_error: 'deliveryAddress.longitude must be a number',
        }),
      })
      .optional(),
    deliveryDate: z.date({
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
