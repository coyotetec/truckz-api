import { APPError } from '../../errors/APPError';
import CheckinRepository from '../../repositories/CheckinRepository';
import DriverRepository from '../../repositories/DriverRepository';

export async function disableCheckin(userId: string) {
  const driver = await DriverRepository.findFirst({
    where: {
      userId,
    },
  });

  if (!driver) {
    throw new APPError('driver not found');
  }

  await CheckinRepository.disableAll(driver.id);
}
