import { z } from 'zod';
import CheckinRepository from '../../repositories/CheckinRepository';
import { checkinStoreSchema } from '../../schemas/checkinSchemas';
import DriverRepository from '../../repositories/DriverRepository';
import { APPError } from '../../errors/APPError';
import { add } from 'date-fns';
import { scheduleJob } from 'node-schedule';

export async function makeCheckin(
  userId: string,
  payload: z.infer<typeof checkinStoreSchema>,
) {
  const driver = await DriverRepository.findFirst({
    where: {
      userId,
    },
  });

  if (!driver) {
    throw new APPError('motorista não encontrado');
  }

  await CheckinRepository.disableAll(driver.id);

  const checkin = await CheckinRepository.create({
    driverId: driver.id,
    city: payload.city,
    state: payload.state,
    latitude: payload.latitude,
    longitude: payload.longitude,
  });

  const mappedCheckin = {
    ...checkin,
    latitude: checkin.latitude.toNumber(),
    longitude: checkin.longitude.toNumber(),
  };

  const { checkinAt, id } = checkin;

  const nextCheckin = add(checkinAt, {
    hours: 24,
  });

  scheduleJob(userId, nextCheckin, async () => {
    await CheckinRepository.update({
      where: {
        id,
      },
      data: {
        active: false,
      },
    });
  });

  return mappedCheckin;
}
