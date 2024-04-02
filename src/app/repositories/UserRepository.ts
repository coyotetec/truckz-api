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

interface IUpdateArgs {
  where: Prisma.UserWhereUniqueInput;
  data: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
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

  async update({ where, data }: IUpdateArgs) {
    return prisma.user.update({
      where,
      data,
      include: {
        driver: true,
        contractor: true,
      },
    });
  }

  deleteById(id: string) {
    return prisma.user.delete({
      where: {
        id,
      },
    });
  }
}

export default new UserRepository();
