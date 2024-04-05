import { cancelJob } from 'node-schedule';
import { validatePassword } from '../../../utils/validatePassword';
import { APPError } from '../../errors/APPError';
import CheckinRepository from '../../repositories/CheckinRepository';
import TruckRepository from '../../repositories/TruckRepository';
import UserRepository from '../../repositories/UserRepository';
import DriverRepository from '../../repositories/DriverRepository';
import LoadAddressRepository from '../../repositories/LoadAddressRepository';
import LoadImageRepository from '../../repositories/LoadImageRepository';
import LoadRepository from '../../repositories/LoadRepository';
import ContractorRepository from '../../repositories/ContractorRepository';
import AddressRepository from '../../repositories/AddressRepository';
import { deleteImage } from '../../../utils/deleteImage';

export async function deleteUser(id: string, password: string) {
  const user = await UserRepository.findFirst({
    where: {
      id,
    },
  });

  if (!user) {
    throw new APPError('usuário não encontrado');
  }

  const samePassword = await validatePassword(password, user.password);

  if (!samePassword) {
    throw new APPError('Senha incorreta');
  }

  if (user.driver) {
    await Promise.all([
      TruckRepository.deleteDriverTrucks(user.driver.id),
      CheckinRepository.deleteDriverCheckins(user.driver.id),
      DriverRepository.deleteById(user.driver.id),
    ]);

    cancelJob(id);
  }

  if (user.contractor) {
    const [loadImages] = await Promise.all([
      LoadImageRepository.findContractorLoadImages(user.contractor.id),
      LoadImageRepository.deleteContractorLoadImages(user.contractor.id),
      LoadAddressRepository.deleteContractorLoadAddresses(user.contractor.id),
      LoadRepository.deleteContractorLoads(user.contractor.id),
      ContractorRepository.deleteById(user.contractor.id),
    ]);

    Promise.all([loadImages.map(({ url }) => deleteImage(url))]);
  }

  await Promise.all([
    AddressRepository.deleteUserAddresses(user.id),
    UserRepository.deleteById(user.id),
  ]);

  user.avatarUrl && deleteImage(user.avatarUrl);
}
