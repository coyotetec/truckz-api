import { Prisma } from '@prisma/client';
import { prisma } from '../../libs/prisma';

interface IFindFirstArgs {
  where: Prisma.ContractorWhereInput;
}

interface IUpdateArgs {
  where: Prisma.ContractorWhereUniqueInput;
  data: Prisma.XOR<
    Prisma.ContractorCreateInput,
    Prisma.ContractorUncheckedCreateInput
  >;
}

class ContractorRepository {
  async create(
    data: Prisma.XOR<
      Prisma.ContractorCreateInput,
      Prisma.ContractorUncheckedCreateInput
    >,
  ) {
    return prisma.contractor.create({
      data,
    });
  }

  async findFirst({ where }: IFindFirstArgs) {
    return prisma.contractor.findFirst({
      where,
    });
  }

  async update({ data, where }: IUpdateArgs) {
    return prisma.contractor.update({
      where,
      data,
    });
  }

  deleteById(id: string) {
    return prisma.contractor.delete({
      where: {
        id,
      },
    });
  }
}

export default new ContractorRepository();
