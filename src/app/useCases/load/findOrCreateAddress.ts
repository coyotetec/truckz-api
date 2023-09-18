import { z } from 'zod';
import AddressRepository from '../../repositories/AddressRepository';
import { addressSchema } from '../../schemas/addressSchemas';

export async function findOrCreateAddress(
  addressId?: string,
  addressData?: z.infer<typeof addressSchema>,
) {
  if (addressId) {
    return await AddressRepository.findById(addressId);
  } else if (addressData) {
    return await AddressRepository.create(addressData);
  } else {
    return null;
  }
}
