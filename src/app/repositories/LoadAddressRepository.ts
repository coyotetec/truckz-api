import { Prisma } from '@prisma/client';
import { prisma } from '../../libs/prisma';

interface IUpdateArgs {
  where: Prisma.LoadAddressWhereUniqueInput;
  data: Prisma.XOR<
    Prisma.LoadAddressUpdateInput,
    Prisma.LoadAddressUncheckedUpdateInput
  >;
}

class AddressRepository {
  async create(
    data: Prisma.XOR<
      Prisma.LoadAddressCreateInput,
      Prisma.LoadAddressUncheckedCreateInput
    >,
  ) {
    return prisma.loadAddress.create({
      data,
    });
  }

  async findById(id: string) {
    return prisma.loadAddress.findUnique({
      where: {
        id,
      },
    });
  }

  async update({ where, data }: IUpdateArgs) {
    return prisma.loadAddress.update({
      where,
      data,
    });
  }

  async deleteById(id: string) {
    return prisma.loadAddress.delete({
      where: {
        id,
      },
    });
  }

  deleteContractorLoadAddresses(contractorId: string) {
    return prisma.loadAddress.deleteMany({
      where: {
        OR: [
          {
            deliveryAddressLoad: {
              some: {
                contractorId,
              },
            },
          },
          {
            pickupAddressLoad: {
              some: {
                contractorId,
              },
            },
          },
        ],
      },
    });
  }
}

export default new AddressRepository();
