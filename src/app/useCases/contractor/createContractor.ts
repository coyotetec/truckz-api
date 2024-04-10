import { z } from 'zod';
import { APPError } from '../../errors/APPError';
import { contractorStoreSchema } from '../../schemas/contractorSchemas';
import { hashPassword } from '../../../utils/hashPassword';
import { uploadImage } from '../../../utils/uploadImage';

import ContractorRepository from '../../repositories/ContractorRepository';
import UserRepository from '../../repositories/UserRepository';

export async function createContractor(
  payload: z.infer<typeof contractorStoreSchema>,
  avatar?: Express.Multer.File,
) {
  const userAlreadyExists = await UserRepository.findFirst({
    where: {
      OR: [{ username: payload.username }, { email: payload.email }],
    },
  });
  const contractorAlreadyExists = await ContractorRepository.findFirst({
    where: {
      OR: [{ cnpj: payload.cnpj }, { cpf: payload.cpf }],
    },
  });

  if (contractorAlreadyExists || userAlreadyExists) {
    const sameFields = [
      ...(payload.cpf && contractorAlreadyExists?.cpf === payload.cpf
        ? ['CPF']
        : []),
      ...(payload.cnpj && contractorAlreadyExists?.cnpj === payload.cnpj
        ? ['CNPJ']
        : []),
      ...(userAlreadyExists?.email === payload.email ? ['Email'] : []),
      ...(userAlreadyExists?.username === payload.username
        ? ['Nome de Usuário']
        : []),
    ];

    throw new APPError(
      `Os seguintes campos já estão em uso: ${sameFields.join(', ')}`,
    );
  }

  const avatarFileName = avatar
    ? await uploadImage(avatar, {
        height: 200,
      })
    : '';
  const hashedPassword = await hashPassword(payload.password);

  const contractor = await ContractorRepository.create({
    name: payload.name,
    cnpj: payload.cnpj,
    cpf: payload.cpf,
    stateRegistration: payload.stateRegistration,
    phoneNumber: payload.phoneNumber,
    whatsappNumber: payload.whatsappNumber || payload.phoneNumber,
    user: {
      create: {
        email: payload.email,
        username: payload.username,
        password: hashedPassword,
        avatarUrl: avatarFileName,
        address: {
          create: {
            name: 'Endereço Principal',
            zipcode: payload.address.zipcode,
            address: payload.address.address,
            number: payload.address.number,
            district: payload.address.district,
            reference: payload.address.reference,
            state: payload.address.state,
            city: payload.address.city,
            latitude: payload.address.latitude,
            longitude: payload.address.longitude,
          },
        },
      },
    },
  });

  return contractor;
}
