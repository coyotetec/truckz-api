import { APPError } from '../../errors/APPError';
import AddressRepository from '../../repositories/AddressRepository';

export async function findAddressById(id: string) {
  const address = await AddressRepository.findById(id);

  if (!address) {
    throw new APPError('Endereço não existe');
  }

  return address;
}
