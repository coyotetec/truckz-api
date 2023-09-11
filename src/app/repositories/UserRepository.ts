import { Prisma } from '@prisma/client';
import { prisma } from '../../libs/prisma';

interface IFindFirstArgs {
  where: Prisma.UserWhereInput;
  include?: Prisma.UserInclude;
}

class UserRepository {
  async findFirst({ where, include }: IFindFirstArgs) {
    return prisma.user.findFirst({
      where,
      include,
    });
  }
}

export default new UserRepository();
