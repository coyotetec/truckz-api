import { Prisma } from '@prisma/client';
import { prisma } from '../../libs/prisma';

interface IFindFirstArgs {
  where: Prisma.UserWhereInput;
}

interface IFindUniqueArgs {
  where: Prisma.UserWhereUniqueInput;
  select?: Prisma.UserSelect;
  include?: Prisma.UserInclude;
}

class UserRepository {
  async findFirst({ where }: IFindFirstArgs) {
    return prisma.user.findFirst({
      where,
      include: {
        driver: true,
        contractor: true,
      },
    });
  }

  async findUnique({ where, include }: IFindUniqueArgs) {
    return prisma.user.findUnique({
      where,
      include,
    });
  }

  async findUniqueContractorId({ where, select }: IFindUniqueArgs) {
    return prisma.user.findUnique({
      where,
      select,
    });
  }
}

export default new UserRepository();
