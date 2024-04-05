import { z } from 'zod';

export const truckSchema = z.object({
  renavam: z.string({
    required_error: 'renavam é um campo obrigatório',
    invalid_type_error: 'renavam deve ser uma string',
  }),
  plate: z.string({
    required_error: 'placa é um campo obrigatório',
    invalid_type_error: 'placa deve ser uma string',
  }),
  crvNumber: z.string({
    required_error: 'crv é um campo obrigatório',
    invalid_type_error: 'crv deve ser uma string',
  }),
  model: z.string({
    required_error: 'modelo é um campo obrigatório',
    invalid_type_error: 'modelo deve ser uma string',
  }),
  holderName: z.string({
    required_error: 'nome do titular é um campo obrigatório',
    invalid_type_error: 'nome do titular deve ser uma string',
  }),
  holderCpf: z
    .string({
      invalid_type_error: 'cpf do titular deve ser uma string',
    })
    .optional(),
  holderCnpj: z
    .string({
      invalid_type_error: 'cnpj do titular deve ser uma string',
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
    required_error: 'quantidade de eixos é um campo obrigatório',
    invalid_type_error: 'quantidade de eixos deve ser do tipo number',
  }),
  tracker: z.boolean({
    required_error: 'rastreador é um campo obrigatório',
    invalid_type_error: 'rastreador deve ser do tipo boolean',
  }),
});
