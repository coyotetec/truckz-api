import { Load, Prisma } from '@prisma/client';
import { prisma } from '../../libs/prisma';

interface IFindAllArgs {
  where: Prisma.LoadWhereInput;
  orderBy?:
    | Prisma.LoadOrderByWithRelationInput
    | Prisma.LoadOrderByWithRelationInput[];
}

interface IFindUniqueArgs {
  where: Prisma.LoadWhereUniqueInput;
}

interface IFindFirstArgs {
  where: Prisma.LoadWhereInput;
}

interface IUpdateArgs {
  where: Prisma.LoadWhereUniqueInput;
  data: Prisma.XOR<Prisma.LoadUpdateInput, Prisma.LoadUncheckedUpdateInput>;
}

class LoadRepository {
  async findAll({ where, orderBy }: IFindAllArgs) {
    return prisma.load.findMany({
      where,
      include: {
        pickupAddress: true,
        deliveryAddress: true,
        loadImage: true,
      },
      orderBy,
    });
  }

  async findClose(data: {
    latitude: number;
    longitude: number;
    radius: number;
  }) {
    return prisma.$queryRaw<Load[]>`
      SELECT *
      FROM load l
      LEFT JOIN address a on l.pickup_address_id = a.id
      WHERE
        6371 * 2 * asin(sqrt(
          power(sin(radians(a.latitude - ${data.latitude}) / 2), 2) +
          cos(radians(${data.latitude})) * cos(radians(a.latitude)) *
          power(sin(radians(a.longitude - ${data.longitude}) / 2), 2)
        )) <= ${data.radius}
      AND l.status = 'Active'
    `;
  }

  async findUnique({ where }: IFindUniqueArgs) {
    return prisma.load.findUnique({
      where,
      include: {
        pickupAddress: true,
        deliveryAddress: true,
        loadImage: true,
        contractor: true,
      },
    });
  }

  async findFirst({ where }: IFindFirstArgs) {
    return prisma.load.findFirst({
      where,
    });
  }

  async create(
    data: Prisma.XOR<Prisma.LoadCreateInput, Prisma.LoadUncheckedCreateInput>,
  ) {
    return prisma.load.create({
      data,
    });
  }

  async update({ where, data }: IUpdateArgs) {
    return prisma.load.update({
      where,
      data,
    });
  }

  async updateUnique(id: string, data: Prisma.LoadUpdateInput) {
    return prisma.load.update({
      where: {
        id,
      },
      data,
    });
  }
}

export default new LoadRepository();
