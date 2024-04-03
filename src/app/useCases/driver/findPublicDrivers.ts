import DriverRepository from '../../repositories/DriverRepository';

interface IFindPublicDriversArgs {
  lt: string;
  lg: string;
}

export async function findPublicDrivers(payload: IFindPublicDriversArgs) {
  const drivers = await DriverRepository.findPublic(payload);

  return drivers;
}
