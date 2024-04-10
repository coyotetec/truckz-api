import { cancelJob } from 'node-schedule';
import { validatePassword } from '../../../utils/validatePassword';
import { APPError } from '../../errors/APPError';
import CheckinRepository from '../../repositories/CheckinRepository';
import DriverRepository from '../../repositories/DriverRepository';
import TruckRepository from '../../repositories/TruckRepository';
import UserRepository from '../../repositories/UserRepository';
import LoadImageRepository from '../../repositories/LoadImageRepository';
import LoadAddressRepository from '../../repositories/LoadAddressRepository';
import LoadRepository from '../../repositories/LoadRepository';
import ContractorRepository from '../../repositories/ContractorRepository';
import { deleteImage } from '../../../utils/deleteImage';
import AddressRepository from '../../repositories/AddressRepository';

interface DeleteAccountPayload {
  username?: string;
  cpf?: string;
  cnpj?: string;
  password: string;
}

export async function deleteAccount(payload: DeleteAccountPayload) {
  const user = await UserRepository.findFirst({
    where: {
      OR: [
        {
          username: payload.username,
        },
        {
          contractor: {
            OR: [{ cpf: payload.cpf }, { cnpj: payload.cnpj }],
          },
        },
        {
          driver: {
            cpf: payload.cpf,
          },
        },
      ],
    },
  });

  if (!user) {
    throw new APPError('Usuário incorreto');
  }

  const samePassword = await validatePassword(payload.password, user.password);

  if (!samePassword) {
    throw new APPError('Senha incorreta');
  }

  if (user.driver) {
    await Promise.all([
      TruckRepository.deleteDriverTrucks(user.driver.id),
      CheckinRepository.deleteDriverCheckins(user.driver.id),
      DriverRepository.deleteById(user.driver.id),
    ]);

    cancelJob(user.id);
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
