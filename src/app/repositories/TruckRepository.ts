import { Prisma } from '@prisma/client';
import { prisma } from '../../libs/prisma';

interface IFindFirstArgs {
  where: Prisma.TruckWhereInput;
}

interface IUpdateArgs {
  where: Prisma.TruckWhereUniqueInput;
  data: Prisma.XOR<Prisma.TruckUpdateInput, Prisma.TruckUncheckedCreateInput>;
}

interface ICreateArgs {
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
  driverId: string;
}

export class TruckRepository {
  findMany() {
    return prisma.truck.findMany();
  }

  create(truckData: ICreateArgs) {
    return prisma.truck.create({
      data: {
        ...truckData,
      },
    });
  }

  async findFirst({ where }: IFindFirstArgs) {
    return await prisma.truck.findFirst({ where });
  }

  async update({ where, data }: IUpdateArgs) {
    return await prisma.truck.update({ where, data });
  }

  delete(truckId: string) {
    return prisma.truck.delete({
      where: {
        id: truckId,
      },
    });
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
