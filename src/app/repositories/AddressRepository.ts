import { Prisma } from '@prisma/client';
import { prisma } from '../../libs/prisma';

interface IFindAllArgs {
  where?: Prisma.AddressWhereInput;
}

class AddressRepository {
  async findAll({ where }: IFindAllArgs) {
    return prisma.address.findMany({
      where,
    });
  }

  async create(
    data: Prisma.XOR<
      Prisma.AddressCreateInput,
      Prisma.AddressUncheckedCreateInput
    >,
  ) {
    return prisma.address.create({
      data,
    });
  }

  async findById(id: string) {
    return prisma.address.findUnique({
      where: {
        id,
      },
    });
  }
}

export default new AddressRepository();
