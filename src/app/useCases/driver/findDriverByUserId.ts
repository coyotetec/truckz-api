import { APPError } from '../../errors/APPError';
import DriverRepository from '../../repositories/DriverRepository';

export async function findDriverByUserId(userId: string) {
  const driver = await DriverRepository.findFirst({
    where: {
      userId,
    },
  });

  if (!driver) {
    throw new APPError('Motorista não encontrado');
  }

  return driver;
}
