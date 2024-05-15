import TruckRepository from '../../repositories/TruckRepository';

export async function findTrucks() {
  const trucks = await TruckRepository.findMany();

  return trucks;
}
