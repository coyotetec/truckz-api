import LoadRepository from '../../repositories/LoadRepository';

interface IFindPublicLoadsArgs {
  lt: string;
  lg: string;
}

export async function findPublicLoads(payload: IFindPublicLoadsArgs) {
  const loads = await LoadRepository.findPublic(payload);

  return loads;
}
