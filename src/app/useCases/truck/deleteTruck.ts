import { APPError } from '../../errors/APPError';
import TruckRepository from '../../repositories/TruckRepository';

interface IDeleteTruckArgs {
  truckId: string;
  userId: string;
}

export async function deleteTruck({ truckId, userId }: IDeleteTruckArgs) {
  const doesTuckBelongToDriver = await TruckRepository.findFirst({
    where: {
      driver: {
        userId,
      },
    },
  });

  if (!doesTuckBelongToDriver) {
    throw new APPError('Você não tem permissão para realizar essa ação');
  }

  await TruckRepository.delete(truckId);

  return { message: 'Caminhão apagado' };
}
