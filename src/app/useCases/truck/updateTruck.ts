import { z } from 'zod';
import { truckSchema } from '../../schemas/truckSchemas';
import { APPError } from '../../errors/APPError';
import TruckRepository from '../../repositories/TruckRepository';

export async function updateTruck(
  userId: string,
  truckId: string,
  payload: z.infer<typeof truckSchema>,
) {
  const truck = await TruckRepository.findFirst({
    where: {
      driver: {
        userId,
      },
    },
  });

  if (!truck) throw new Error('truck does not exists');

  const truckAlreadyExists = await TruckRepository.findFirst({
    where: {
      OR: [
        { renavam: payload.renavam },
        { plate: payload.plate },
        { crvNumber: payload.crvNumber },
      ],
    },
  });

  if (truckAlreadyExists && truckId !== truckAlreadyExists.id) {
    const sameFields = [
      ...(truckAlreadyExists?.renavam === payload.renavam ? ['renavam'] : []),
      ...(truckAlreadyExists?.plate === payload.plate ? ['plate'] : []),
      ...(truckAlreadyExists?.crvNumber === payload.crvNumber
        ? ['crvNumber']
        : []),
    ];

    throw new APPError(
      `the following fields are already in user: ${sameFields.join(', ')}`,
    );
  }

  const updatedTruck = await TruckRepository.update({
    where: {
      id: truck.id,
    },
    data: {
      renavam: payload.renavam,
      plate: payload.plate,
      crvNumber: payload.crvNumber,
      model: payload.model,
      holderName: payload.holderName,
      holderCpf: payload.holderCpf,
      holderCnpj: payload.holderCnpj,
      type: payload.type,
      axlesQty: payload.axlesQty,
      tracker: payload.tracker,
    },
  });

  return updatedTruck;
}
