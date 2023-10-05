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
    throw new APPError('contractor does not exists');
  }

  const { contractorId } = contractor;
  console.log(contractorId);
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
