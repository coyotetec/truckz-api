import { Prisma } from '@prisma/client';
import { prisma } from '../../libs/prisma';

interface IFindFirstArgs {
  where: Prisma.UserWhereInput;
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
}

export default new UserRepository();
