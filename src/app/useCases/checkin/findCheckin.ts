import { APPError } from '../../errors/APPError';
import CheckinRepository from '../../repositories/CheckinRepository';
import DriverRepository from '../../repositories/DriverRepository';

export async function findCheckin(userId: string) {
  const driver = await DriverRepository.findFirst({
    where: {
      userId,
    },
  });

  if (!driver) {
    throw new APPError('Motorista não encontrado');
  }

  const checkin = await CheckinRepository.findFirst({
    where: {
      active: true,
      driverId: driver.id,
    },
  });

  return checkin;
}
