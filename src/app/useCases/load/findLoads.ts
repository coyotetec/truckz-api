import { APPError } from '../../errors/APPError';
import CheckinRepository from '../../repositories/CheckinRepository';
import LoadRepository from '../../repositories/LoadRepository';

export async function findLoads(
  userId: string,
  accountType: 'driver' | 'contractor' | 'undefined',
) {
  if (accountType === 'contractor') {
    const loads = await LoadRepository.findAll({
      where: {
        contractor: {
          user: {
            some: {
              id: userId,
            },
          },
        },
      },
    });

    return loads;
  }

  if (accountType === 'driver') {
    const lastCheckin = await CheckinRepository.findFirst({
      where: {
        driver: {
          userId,
        },
        active: true,
      },
    });

    if (!lastCheckin) {
      throw new APPError('the driver needs to have an active checkin');
    }

    const loads = await LoadRepository.findClose({
      latitude: Number(lastCheckin.latitude),
      longitude: Number(lastCheckin.longitude),
      radius: 200,
    });

    return loads;
  }
}
