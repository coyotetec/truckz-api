import { z } from 'zod';

export const truckSchema = z.object({
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
});
