import { z } from 'zod';
import { addressSchema } from './addressSchemas';

export const publicLoadsSchema = z.object({
  lt: z.string({ required_error: 'latitude é obrigatória ' }).trim(),
  lg: z.string({ required_error: 'longitude é obrigatório' }).trim(),
});

export const loadCloseStatus = z.enum(['cancelled', 'finished'], {
  required_error: 'status é um campo obrigatório',
  invalid_type_error: 'status deve ser cancelado ou finalizado',
});

export const loadIndexSchema = z.object({
  originState: z.string().optional(),
  originCity: z.string().optional(),
  destinationState: z.string().optional(),
  destinationCity: z.string().optional(),
  radius: z
    .string({
      invalid_type_error: 'raio deve ser do tipo number',
    })
    .optional()
    .default('250')
    .transform((v) => parseFloat(v)),
  type: z.enum(['full', 'complement', 'full_complement']).optional(),
});

export const loadStoreSchema = z
  .object({
    title: z
      .string({
        invalid_type_error: 'título deve ser uma string',
      })
      .optional(),
    type: z.enum(['full', 'complement', 'full_complement'], {
      invalid_type_error: 'tipo deve ser: full, complement, full_complement',
      required_error: 'tipo é um campo obrigatório',
    }),
    price: z.number({
      required_error: 'preço é um campo obrigatório',
      invalid_type_error: 'preço deve ser do tipo number',
    }),
    length: z
      .number({
        invalid_type_error: 'comprimento deve ser do tipo number',
      })
      .optional(),
    width: z
      .number({
        invalid_type_error: 'largura deve ser do tipo number',
      })
      .optional(),
    height: z
      .number({
        invalid_type_error: 'altura deve ser do tipo number',
      })
      .optional(),
    dimensionsUnit: z
      .enum(['centimeters', 'meters'], {
        invalid_type_error:
          'unidade das dimensões deve ser: centimeters, meters',
      })
      .optional(),
    weight: z
      .number({
        invalid_type_error: 'peso deve ser do tipo number',
      })
      .optional(),
    weightUnit: z
      .enum(['grams', 'kilograms', 'tons'], {
        invalid_type_error: 'unidade do peso deve ser: grams, kilograms, tons',
      })
      .optional(),
    pickupAddressId: z
      .string({
        invalid_type_error: 'id do endereço de coleta deve ser uma string',
      })
      .uuid({
        message: 'id do endereço de coleta deve ter o formato uuid',
      })
      .optional(),
    description: z
      .string({
        invalid_type_error: 'descrição deve ser uma string',
      })
      .optional(),
    pickupAddress: addressSchema.optional(),
    pickupDate: z.coerce.date({
      required_error: 'data da coleta é um campo obrigatório',
      invalid_type_error: 'data da coleta deve ser do tipo date',
    }),
    deliveryAddressId: z
      .string({
        invalid_type_error: 'id do endereço de entrega deve ser uma string',
      })
      .uuid({
        message: 'id do endereço de entrega deve ter o formato uuid',
      })
      .optional(),
    deliveryAddress: addressSchema.optional(),
    deliveryDate: z.coerce.date({
      required_error: 'data da entrega é um campo obrigatório',
      invalid_type_error: 'data da entrega deve ser do tipo date',
    }),
  })
  .superRefine((val, ctx) => {
    if (!val.deliveryAddressId && !val.deliveryAddress) {
      ctx.addIssue({
        message:
          'você precisa enviar endereço de entrega ou id do endereço de entrega',
        code: z.ZodIssueCode.custom,
      });
    }
    if (!val.pickupAddressId && !val.pickupAddress) {
      ctx.addIssue({
        message:
          'você precisa enviar o endereço de coleta ou o id do endereço de coleta',
        code: z.ZodIssueCode.custom,
      });
    }
  });
