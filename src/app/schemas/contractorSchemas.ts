import { z } from 'zod';

export const contractorStoreSchema = z.object({
  name: z.string({
    required_error: 'nome é um campo obrigatório',
    invalid_type_error: 'nome deve ser uma string',
  }),
  cnpj: z
    .string({
      invalid_type_error: 'cnpj deve ser uma string',
    })
    .optional(),
  cpf: z
    .string({
      invalid_type_error: 'cpf deve ser uma string',
    })
    .optional(),
  stateRegistration: z.string({
    required_error: 'registro estadual é um campo obrigatório',
    invalid_type_error: 'registro estadual deve ser uma string',
  }),
  email: z
    .string({
      required_error: 'email é um campo obrigatório',
      invalid_type_error: 'email deve ser uma string',
    })
    .email({
      message: 'email não tem o formato correto',
    }),
  phoneNumber: z.string({
    required_error: 'número de telefone é um campo obrigatório',
    invalid_type_error: 'número de telefone deve ser uma string',
  }),
  whatsappNumber: z
    .string({
      invalid_type_error: 'número do whatsapp deve ser uma string',
    })
    .optional(),
  username: z.string({
    required_error: 'nome de usuário é um campo obrigatório',
    invalid_type_error: 'nome de usuário deve ser uma string',
  }),
  password: z.string({
    required_error: 'senha é um campo obrigatório',
    invalid_type_error: 'senha deve ser uma string',
  }),
  address: z.object(
    {
      zipcode: z
        .string({
          invalid_type_error: 'CEP deve ser uma string',
        })
        .optional(),
      address: z.string({
        required_error: 'endereço é um campo obrigatório',
        invalid_type_error: 'endereço deve ser uma string',
      }),
      number: z
        .number({
          invalid_type_error: 'número do endereço deve ser do tipo number',
        })
        .optional(),
      district: z.string({
        required_error: 'bairro é um campo obrigatório',
        invalid_type_error: 'bairro deve ser uma string',
      }),
      reference: z
        .string({
          invalid_type_error: 'referência deve ser uma string',
        })
        .optional(),
      state: z.string({
        required_error: 'estado é um campo obrigatório',
        invalid_type_error: 'estado deve ser uma string',
      }),
      city: z.string({
        required_error: 'cidade é um campo obrigatório',
        invalid_type_error: 'cidade deve ser uma string',
      }),
      latitude: z.number({
        required_error: 'latitude é um campo obrigatório',
        invalid_type_error: 'latitude deve ser do tipo number',
      }),
      longitude: z.number({
        required_error: 'longitude é um campo obrigatório',
        invalid_type_error: 'longitude deve ser do tipo number',
      }),
    },
    {
      required_error: 'endereço é um campo obrigatório',
    },
  ),
});

export const updateContratorSchema = z.object({
  name: z.string({
    required_error: 'nome  é um campo obrigatório',
    invalid_type_error: 'nome deve ser uma string',
  }),
  cnpj: z
    .string({
      invalid_type_error: 'cnpj deve ser uma string',
    })
    .optional(),
  cpf: z
    .string({
      invalid_type_error: 'cpf deve ser uma string',
    })
    .optional(),
  stateRegistration: z.string({
    required_error: 'registro estadual é um campo obrigatório',
    invalid_type_error: 'registro estadual deve ser uma string',
  }),
  phoneNumber: z.string({
    required_error: 'número de telefone é um campo obrigatório',
    invalid_type_error: 'número de telefone deve ser uma string',
  }),
  whatsappNumber: z
    .string({
      invalid_type_error: 'número do whatsapp deve ser uma string',
    })
    .optional(),
});
