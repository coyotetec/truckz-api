import { Prisma } from '@prisma/client';
import { prisma } from '../../libs/prisma';

interface IFindFirstArgs {
  where: Prisma.UserWhereInput;
}

interface IFindUniqueArgs {
  where: Prisma.UserWhereUniqueInput;
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
}

export default new UserRepository();
