import { APPError } from '../../errors/APPError';
import CheckinRepository from '../../repositories/CheckinRepository';
import LoadRepository from '../../repositories/LoadRepository';

export async function findLoads(driverId: string) {
  const lastCheckin = await CheckinRepository.findFirst({
    where: {
      driverId,
      active: true,
    },
  });

  if (!lastCheckin) {
    throw new APPError('the driver needs to have an active checkin');
  }

  const loads = await LoadRepository.findAll({
    latitude: Number(lastCheckin.latitude),
    longitude: Number(lastCheckin.longitude),
    radius: 200,
  });

  return loads;
}
