import { z } from 'zod';
import { loadStoreSchema } from '../../schemas/loadSchemas';
import { prisma } from '../../../libs/prisma';
import { APPError } from '../../errors/APPError';
import { createOrUpdateAddress } from '../../../utils/createOrUpdateAddress';

export async function updateLoad(
  userId: string,
  loadId: string,
  payload: z.infer<typeof loadStoreSchema>,
) {
  const load = await prisma.load.findFirst({
    where: {
      id: loadId,
      contractor: {
        user: {
          some: {
            id: userId,
          },
        },
      },
    },
  });

  if (!load) {
    throw new APPError('load does not exists');
  }

  const deliveryAddress = await createOrUpdateAddress(
    payload.deliveryAddressId,
    payload.deliveryAddress && {
      name: 'Endereço Delivery',
      ...payload.deliveryAddress,
    },
  );

  const pickupAddress = await createOrUpdateAddress(
    payload.pickupAddressId,
    payload.pickupAddress && {
      name: 'Endereço Pickup',
      ...payload.pickupAddress,
    },
  );

  if (!deliveryAddress) {
    throw new APPError(
      'you need to inform a valid deliveryId or pass data to create a new one',
    );
  }

  if (!pickupAddress) {
    throw new APPError(
      'you need to inform a valid pickupAddress or pass data to create a new one',
    );
  }

  const updateLoad = await prisma.load.update({
    where: {
      id: loadId,
    },
    data: {
      contractorId: load.contractorId,
      title: payload.title,
      price: payload.price,
      length: payload.length,
      width: payload.width,
      height: payload.height,
      dimensionsUnit: payload.dimensionsUnit,
      weight: payload.weight,
      weightUnit: payload.weightUnit,
      description: payload.description,
      pickupAddressId: pickupAddress.id,
      pickupDate: payload.pickupDate,
      deliveryAddressId: deliveryAddress.id,
      deliveryDate: payload.deliveryDate,
    },
  });

  return updateLoad;
}
