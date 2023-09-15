import { z } from 'zod';
import AddressRepository from '../app/repositories/AddressRepository';
import { AddressSchema } from '../app/schemas/addressSchemas';

export async function createOrUpdateAddress(
  addressId?: string,
  addressData?: z.infer<typeof AddressSchema>,
) {
  if (addressId) {
    return await AddressRepository.findById(addressId);
  } else if (addressData) {
    return await AddressRepository.create(addressData);
  } else {
    return null;
  }
}
