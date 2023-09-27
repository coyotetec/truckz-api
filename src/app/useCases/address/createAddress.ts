import { z } from 'zod';
import { addressSchema } from '../../schemas/addressSchemas';
import UserRepository from '../../repositories/UserRepository';
import { APPError } from '../../errors/APPError';
import AddressRepository from '../../repositories/AddressRepository';

export async function createAddress(
  payload: z.infer<typeof addressSchema>,
  userId: string,
) {
  const user = await UserRepository.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user || !user.active) {
    throw new APPError('user does not exists or is not active');
  }

  const address = await AddressRepository.create({
    ...payload,
    userId,
  });

  return address;
}
