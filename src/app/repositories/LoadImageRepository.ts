import { Prisma } from '@prisma/client';

import { prisma } from '../../libs/prisma';

interface IFindManyArgs {
  where: Prisma.LoadImageWhereInput;
}

interface IDeleteManyArgs {
  where: Prisma.LoadImageWhereInput;
}

class LoadImageRepository {
  async findMany({ where }: IFindManyArgs) {
    return prisma.loadImage.findMany({
      where,
    });
  }

  async deleteMany({ where }: IDeleteManyArgs) {
    return prisma.loadImage.deleteMany({
      where,
    });
  }
}

export default new LoadImageRepository();
