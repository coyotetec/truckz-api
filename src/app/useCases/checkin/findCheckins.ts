import { z } from 'zod';
import { checkinIndexSchema } from '../../schemas/checkinSchemas';
import CheckinRepository from '../../repositories/CheckinRepository';

export async function findCheckins(data: z.infer<typeof checkinIndexSchema>) {
  const checkins = await CheckinRepository.findAll(data);

  return checkins;
}
