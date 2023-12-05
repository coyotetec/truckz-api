import { Prisma } from '@prisma/client';
import { prisma } from '../../libs/prisma';

interface IFindFirstArgs {
  where: Prisma.CheckinWhereInput;
}

interface FindAllQueryResponse {
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
}

interface IUpdate {
  where: Prisma.CheckinWhereUniqueInput;
  data: Prisma.XOR<
    Prisma.CheckinUpdateInput,
    Prisma.CheckinUncheckedUpdateInput
  >;
}

class CheckinRepository {
  async findAll(data: { latitude: number; longitude: number; radius: number }) {
    return prisma.$queryRaw<FindAllQueryResponse[]>`
      SELECT c.*, d.full_name, d.phone_number, d.whatsapp_number, u.avatar_url
      FROM checkin c
      LEFT JOIN driver d ON c.driver_id = d.id
      LEFT JOIN "user" u ON d.user_id = u.id
      WHERE
        6371 * 2 * asin(sqrt(
          power(sin(radians(c.latitude - ${data.latitude}) / 2), 2) +
          cos(radians(${data.latitude})) * cos(radians(c.latitude)) *
          power(sin(radians(c.longitude - ${data.longitude}) / 2), 2)
        )) <= ${data.radius}
      AND c.active = true
    `;
  }

  async findFirst({ where }: IFindFirstArgs) {
    return prisma.checkin.findFirst({
      where,
    });
  }

  async create(
    data: Prisma.XOR<
      Prisma.CheckinCreateInput,
      Prisma.CheckinUncheckedCreateInput
    >,
  ) {
    return prisma.checkin.create({
      data,
    });
  }

  async disableAll(driverId: string) {
    return prisma.checkin.updateMany({
      data: {
        active: false,
      },
      where: {
        driverId,
        active: true,
      },
    });
  }

  async update({ where, data }: IUpdate) {
    return prisma.checkin.update({
      where,
      data,
    });
  }
}

export default new CheckinRepository();
