import { prisma } from '../../../libs/prisma';

export async function findTrucks() {
  const trucks = await prisma.truck.findMany();

  return trucks;
}
