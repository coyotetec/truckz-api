import { Prisma } from '@prisma/client';
import { prisma } from '../../libs/prisma';

interface IFindFirstArgs {
  where: Prisma.DriverWhereInput;
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
}

export default new DriverRepository();
