import { z } from 'zod';
import { addressSchema } from '../../schemas/addressSchemas';
import AddressRepository from '../../repositories/AddressRepository';
import { prisma } from '../../../libs/prisma';
import { APPError } from '../../errors/APPError';

interface IUpdateAddressArgs {
  addressId: string;
  addressData: z.infer<typeof addressSchema>;
}

export async function updateAddress({
  addressId,
  addressData,
}: IUpdateAddressArgs) {
  const address = await prisma.address.findUnique({
    where: {
      id: addressId,
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
