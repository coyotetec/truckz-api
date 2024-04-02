import { Prisma } from '@prisma/client';
import { prisma } from '../../libs/prisma';

interface IFindUniqueArgs {
  where: Prisma.ResetTokenWhereUniqueInput;
}
class ResetTokenRepository {
  async create(
    data: Prisma.XOR<
      Prisma.ResetTokenCreateInput,
      Prisma.ResetTokenUncheckedCreateInput
    >,
  ) {
    return prisma.resetToken.create({
      data,
    });
  }

  async findUnique({ where }: IFindUniqueArgs) {
    return prisma.resetToken.findUnique({
      where,
    });
  }

  async deleteById(id: string) {
    return prisma.resetToken.delete({
      where: {
        id,
      },
    });
  }
}

export default new ResetTokenRepository();
