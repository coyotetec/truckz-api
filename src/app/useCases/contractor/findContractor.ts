import { APPError } from '../../errors/APPError';
import ContractorRepository from '../../repositories/ContractorRepository';

export async function findContractor(userId: string) {
  const contractor = await ContractorRepository.findFirst({
    where: {
      user: {
        some: {
          id: userId,
        },
      },
    },
  });

  if (!contractor) {
    throw new APPError('Contratante não encontrado');
  }

  return contractor;
}
