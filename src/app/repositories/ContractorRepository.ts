import { Prisma } from '@prisma/client';
import { prisma } from '../../libs/prisma';

interface IFindFirstArgs {
  where: Prisma.ContractorWhereInput;
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
}

export default new ContractorRepository();
