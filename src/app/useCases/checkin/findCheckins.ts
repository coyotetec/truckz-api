import { z } from 'zod';
import { checkinIndexSchema } from '../../schemas/checkinSchemas';
import CheckinRepository from '../../repositories/CheckinRepository';

export async function findCheckins(data: z.infer<typeof checkinIndexSchema>) {
  const checkins = await CheckinRepository.findAll(data);

  const mappedCheckins = checkins.map((checkin) => ({
    id: checkin.id,
    active: checkin.active,
    latitude: checkin.latitude.toNumber(),
    longitude: checkin.longitude.toNumber(),
    city: checkin.city,
    state: checkin.state,
    checkinAt: checkin.checkin_at,
    driverId: checkin.driver_id,
    fullName: checkin.full_name,
    phoneNumber: checkin.phone_number,
    whatsappNumber: checkin.whatsapp_number,
    ...(checkin.avatar_url && {
      avatarUrl: `https://s3.amazonaws.com/truckz-test/${checkin.avatar_url}`,
    }),
  }));

  return mappedCheckins;
}
