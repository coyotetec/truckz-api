import { z } from 'zod';
import { addressSchema } from '../../schemas/addressSchemas';
import AddressRepository from '../../repositories/AddressRepository';
import { APPError } from '../../errors/APPError';

interface IUpdateAddressArgs {
  userId: string;
  addressId: string;
  addressData: z.infer<typeof addressSchema>;
}

export async function updateAddress({
  addressId,
  addressData,
  userId,
}: IUpdateAddressArgs) {
  const address = await AddressRepository.findUnique({
    where: {
      id: addressId,
      user: {
        id: userId,
      },
    },
  });

  if (!address) {
    throw new APPError('address does not exists');
  }

  const addressUpdated = await AddressRepository.update({
    where: {
      id: addressId,
    },
    data: addressData,
  });

  return addressUpdated;
}
