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
  lt: string;
  lg: string;
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

  findPublic({ lg, lt }: IFindPublicDriversArgs) {
    return prisma.$queryRawUnsafe(`SELECT
	c.*,
	d.full_name,
	d.phone_number,
	d.whatsapp_number,
	u.avatar_url,
	6371 * 2 * asin(sqrt(
      power(sin(radians(c.latitude - ${lt}) / 2), 2) +
       cos(radians(${lt})) * cos(radians(c.latitude)) *
      power(sin(radians(c.longitude - ${lg}) / 2), 2)
    )) as distance
FROM checkin c
LEFT JOIN driver d ON c.driver_id = d.id
LEFT JOIN "user" u ON d.user_id = u.id
WHERE c.active = true
ORDER BY distance`);
  }
}

export default new DriverRepository();
