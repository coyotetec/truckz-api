import { Prisma } from '@prisma/client';
import { prisma } from '../../libs/prisma';

interface IFindFirstArgs {
  where: Prisma.DriverWhereInput;
}
interface IUpdateArgs {
  where: Prisma.DriverWhereUniqueInput;
  data: Prisma.XOR<Prisma.DriverUpdateInput, Prisma.DriverUncheckedUpdateInput>;
}

class DriverRepository {
  async create(
    data: Prisma.XOR<
      Prisma.DriverCreateInput,
      Prisma.DriverUncheckedCreateInput
    >,
  ) {
    return prisma.driver.create({
      data,
    });
  }

  async findFirst({ where }: IFindFirstArgs) {
    return prisma.driver.findFirst({
      where,
    });
  }

  async update({ where, data }: IUpdateArgs) {
    return prisma.driver.update({
      where,
      data,
    });
  }

  deleteById(id: string) {
    return prisma.driver.delete({
      where: {
        id,
      },
    });
  }
}

export default new DriverRepository();
