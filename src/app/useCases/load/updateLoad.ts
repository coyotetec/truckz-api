import { z } from 'zod';
import { loadStoreSchema } from '../../schemas/loadSchemas';
import { prisma } from '../../../libs/prisma';
import { APPError } from '../../errors/APPError';
import { findOrCreateAddress } from './findOrCreateAddress';

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

  const deliveryAddress = await findOrCreateAddress(
    payload.deliveryAddressId,
    payload.deliveryAddress && {
      ...payload.deliveryAddress,
      name: 'Endereço Delivery',
    },
  );

  const pickupAddress = await findOrCreateAddress(
    payload.pickupAddressId,
    payload.pickupAddress && {
      ...payload.pickupAddress,
      name: 'Endereço Pickup',
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
