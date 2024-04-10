import { Prisma } from '@prisma/client';
import { prisma } from '../../libs/prisma';

interface IFindFirstArgs {
  where: Prisma.DriverWhereInput;
}
interface IUpdateArgs {
  where: Prisma.DriverWhereUniqueInput;
  data: Prisma.XOR<Prisma.DriverUpdateInput, Prisma.DriverUncheckedUpdateInput>;
}

interface IFindPublicDriversArgs {
  lat: string;
  lng: string;
}

interface IFindPublicQueryResponse {
  id: string;
  active: boolean;
  latitude: Prisma.Decimal;
  longitude: Prisma.Decimal;
  city: string;
  state: string;
  checkin_at: Date;
  driver_id: string;
  full_name: string;
  phone_number: string;
  whatsapp_number: string;
  avatar_url: string;
  distance: number;
}

class DriverRepository {
  async create(
    data: Prisma.XOR<
      Prisma.DriverCreateInput,
      Prisma.DriverUncheckedCreateInput
    >,
  ) {
    return prisma.driver.create({
      data,
    });
  }

  async findFirst({ where }: IFindFirstArgs) {
    return prisma.driver.findFirst({
      where,
    });
  }

  async update({ where, data }: IUpdateArgs) {
    return prisma.driver.update({
      where,
      data,
    });
  }

  deleteById(id: string) {
    return prisma.driver.delete({
      where: {
        id,
      },
    });
  }

  findPublic({ lng, lat }: IFindPublicDriversArgs) {
    return prisma.$queryRawUnsafe<IFindPublicQueryResponse[]>(`
      SELECT
        c.*,
        d.full_name,
        d.phone_number,
        d.whatsapp_number,
        u.avatar_url,
        6371 * 2 * asin(sqrt(
          power(sin(radians(c.latitude - ${lat}) / 2), 2) +
          cos(radians(${lat})) * cos(radians(c.latitude)) *
          power(sin(radians(c.longitude - ${lng}) / 2), 2)
        )) as distance
      FROM checkin c
      LEFT JOIN driver d ON c.driver_id = d.id
      LEFT JOIN "user" u ON d.user_id = u.id
      WHERE c.active = true
      ORDER BY distance
    `);
  }
}

export default new DriverRepository();
