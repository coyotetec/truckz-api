import { z } from 'zod';
import AddressRepository from '../../repositories/AddressRepository';
import { addressSchema } from '../../schemas/addressSchemas';
import LoadAddressRepository from '../../repositories/LoadAddressRepository';

export async function findCreateOrUpdateAddress(
  loadAddressId: string,
  addressId?: string,
  addressData?: z.infer<typeof addressSchema>,
) {
  if (loadAddressId === addressId) {
    return loadAddressId;
  } else if (addressId) {
    const userAddress = await AddressRepository.findById(addressId);

    if (!userAddress) {
      return null;
    }

    const loadAddress = await LoadAddressRepository.update({
      where: {
        id: loadAddressId,
      },
      data: {
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
      },
    });

    return loadAddress.id;
  } else if (addressData) {
    const loadAddress = await LoadAddressRepository.update({
      where: { id: loadAddressId },
      data: addressData,
    });

    return loadAddress.id;
  } else {
    return null;
  }
}
