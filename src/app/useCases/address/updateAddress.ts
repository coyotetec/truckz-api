import { z } from 'zod';
import { addressSchema } from '../../schemas/addressSchemas';
import AddressRepository from '../../repositories/AddressRepository';

interface IUpdateAddressArgs {
  addressId: string;
  addressData: z.infer<typeof addressSchema>;
}

export async function updateAddress({
  addressId,
  addressData,
}: IUpdateAddressArgs) {
  const addressUpdated = await AddressRepository.update({
    where: {
      id: addressId,
    },
    data: addressData,
  });

  return addressUpdated;
}
