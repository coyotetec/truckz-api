import { APPError } from '../../errors/APPError';
import DriverRepository from '../../repositories/DriverRepository';
import TruckRepository from '../../repositories/TruckRepository';

interface ICreateTruckData {
  renavam: string;
  plate: string;
  crvNumber: string;
  model: string;
  holderName?: string;
  holderCpf?: string;
  holderCnpj?: string;
  type:
    | 'bau'
    | 'bau_frigorifico'
    | 'sider'
    | 'cacamba'
    | 'grade_baixa'
    | 'graneleiro'
    | 'prancha';
  axlesQty: number;
  tracker: boolean;
}

interface ICreateTruckArgs {
  truckData: ICreateTruckData;
  userId: string;
}

export async function createTruck({ truckData, userId }: ICreateTruckArgs) {
  const isDriver = await DriverRepository.findUnique(userId);

  if (!isDriver) {
    throw new APPError('Você não tem permissão para acessar essa rota');
  }

  const truck = await TruckRepository.create({
    ...truckData,
    driverId: isDriver.id,
  });

  return truck;
}
