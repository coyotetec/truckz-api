import { Prisma } from '@prisma/client';
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

interface IFindPublicLoadsArgs {
  lt: string;
  lg: string;
}

interface FindCloseQueryResponse {
  id: string;
  title: string | null;
  type: 'complement' | 'full' | 'full_complement';
  status: 'active' | 'cancelled' | 'finished';
  price: Prisma.Decimal;
  length: Prisma.Decimal | null;
  width: Prisma.Decimal | null;
  height: Prisma.Decimal | null;
  dimensions_unit: 'centimeters' | 'meters';
  weight: Prisma.Decimal | null;
  weight_unit: 'grams' | 'kilograms' | 'tons';
  description: string | null;
  pickup_address_id: string;
  pickup_date: Date;
  delivery_address_id: string;
  delivery_date: Date;
  created_at: Date;
  seen_times: number;
  contractor_id: string;
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
    originState?: string;
    originCity?: string;
    destinationState?: string;
    destinationCity?: string;
    type?: string;
  }) {
    return prisma.$queryRawUnsafe<FindCloseQueryResponse[]>(`
      SELECT
        l.*
      FROM load l
      LEFT JOIN load_address pa on l.pickup_address_id = pa.id
      LEFT JOIN load_address da on l.delivery_address_id = da.id
      WHERE
        6371 * 2 * asin(sqrt(
          power(sin(radians(pa.latitude - ${data.latitude}) / 2), 2) +
          cos(radians(${data.latitude})) * cos(radians(pa.latitude)) *
          power(sin(radians(pa.longitude - ${data.longitude}) / 2), 2)
        )) <= ${data.radius}
      AND l.status = 'active'
      ${data.originState ? `AND pa.state = '${data.originState}'` : ''}
      ${data.originCity ? `AND pa.city = '${data.originCity}'` : ''}
      ${
        data.destinationState ? `AND da.state = '${data.destinationState}'` : ''
      }
      ${data.destinationCity ? `AND da.city = '${data.destinationCity}'` : ''}
      ${
        data.type && data.type !== 'full_complement'
          ? `AND l.type = '${data.type}'`
          : ''
      }
    `);
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

  findPublic({ lt, lg }: IFindPublicLoadsArgs) {
    return prisma.$queryRawUnsafe(`
  SELECT
    l.*,
    6371 * 2 * asin(sqrt(
        power(sin(radians(pa.latitude - ${lt}) / 2), 2) +
        cos(radians(${lt})) * cos(radians(pa.latitude)) *
        power(sin(radians(pa.longitude - ${lg}) / 2), 2)
    )) as distance
  FROM load l
  LEFT JOIN load_address pa on l.pickup_address_id = pa.id
  LEFT JOIN load_address da on l.delivery_address_id = da.id
  WHERE l.status = 'active'
  ORDER BY distance`);
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

  deleteContractorLoads(contractorId: string) {
    return prisma.load.deleteMany({
      where: {
        contractorId,
      },
    });
  }
}

export default new LoadRepository();
