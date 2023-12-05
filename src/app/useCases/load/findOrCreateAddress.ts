import { z } from 'zod';
import AddressRepository from '../../repositories/AddressRepository';
import { addressSchema } from '../../schemas/addressSchemas';
import LoadAddressRepository from '../../repositories/LoadAddressRepository';

export async function findOrCreateAddress(
  addressId?: string,
  addressData?: z.infer<typeof addressSchema>,
) {
  if (addressId) {
    const userAddress = await AddressRepository.findById(addressId);

    if (!userAddress) {
      return null;
    }

    const loadAddress = await LoadAddressRepository.create({
      name: userAddress.name,
      zipcode: userAddress.zipcode,
      address: userAddress.address,
      number: userAddress.number,
      district: userAddress.district,
      reference: userAddress.reference,
      state: userAddress.state,
      city: userAddress.city,
      latitude: userAddress.latitude,
      longitude: userAddress.longitude,
    });

    return loadAddress.id;
  } else if (addressData) {
    const loadAddress = await LoadAddressRepository.create(addressData);

    return loadAddress.id;
  } else {
    return null;
  }
}
