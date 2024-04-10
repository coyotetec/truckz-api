import { APPError } from '../../errors/APPError';
import AddressRepository from '../../repositories/AddressRepository';
import LoadRepository from '../../repositories/LoadRepository';

export async function deleteAddress(addressId: string, userId: string) {
  const address = await AddressRepository.findUnique({
    where: {
      id: addressId,
      user: {
        id: userId,
      },
    },
  });

  if (!address) {
    throw new APPError('Endereço não existe');
  }

  const load = await LoadRepository.findFirst({
    where: {
      OR: [{ pickupAddressId: addressId }, { deliveryAddressId: addressId }],
    },
  });

  if (load) {
    throw new APPError('Você não pode apagar esse endereço');
  }

  await AddressRepository.deleteById(addressId);
}
