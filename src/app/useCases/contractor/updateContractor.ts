import { z } from 'zod';
import { updateContratorSchema } from '../../schemas/contractorSchemas';
import { APPError } from '../../errors/APPError';
import UserRepository from '../../repositories/UserRepository';
import ContractorRepository from '../../repositories/ContractorRepository';

export async function updateContractor(
  payload: z.infer<typeof updateContratorSchema>,
  userId: string,
) {
  const contractor = await UserRepository.findUniqueContractorId({
    where: {
      id: userId,
    },
    select: {
      contractorId: true,
    },
  });

  if (!contractor) {
    throw new APPError('Contratante não encontrado');
  }

  const contractorAlreadyExists = await ContractorRepository.findFirst({
    where: {
      OR: [{ cnpj: payload.cnpj }, { cpf: payload.cpf }],
    },
  });

  if (
    contractorAlreadyExists &&
    contractorAlreadyExists.id !== contractor.contractorId
  ) {
    const sameFields = [
      ...(payload.cpf && contractorAlreadyExists?.cpf === payload.cpf
        ? ['CPF']
        : []),
      ...(payload.cnpj && contractorAlreadyExists?.cnpj === payload.cnpj
        ? ['CNPJ']
        : []),
    ];

    throw new APPError(
      `Os seguintes campos já estão em uso: ${sameFields.join(', ')}`,
    );
  }

  const { contractorId } = contractor;

  const contractorUpdated = await ContractorRepository.update({
    where: {
      id: contractorId || undefined,
    },
    data: {
      name: payload.name,
      cnpj: payload.cnpj,
      cpf: payload.cpf,
      stateRegistration: payload.stateRegistration,
      phoneNumber: payload.phoneNumber,
      whatsappNumber: payload.whatsappNumber || payload.phoneNumber,
    },
  });

  return contractorUpdated;
}
