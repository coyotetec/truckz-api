import { Prisma } from '@prisma/client';
import { prisma } from '../../libs/prisma';

interface IFindFirstArgs {
  where: Prisma.TruckWhereInput;
}

interface IUpdateArgs {
  where: Prisma.TruckWhereUniqueInput;
  data: Prisma.XOR<Prisma.TruckUpdateInput, Prisma.TruckUncheckedCreateInput>;
}

export class TruckRepository {
  async findFirst({ where }: IFindFirstArgs) {
    return await prisma.truck.findFirst({ where });
  }

  async update({ where, data }: IUpdateArgs) {
    return await prisma.truck.update({ where, data });
  }

  deleteDriverTrucks(driverId: string) {
    return prisma.truck.deleteMany({
      where: {
        driverId,
      },
    });
  }
}

export default new TruckRepository();
