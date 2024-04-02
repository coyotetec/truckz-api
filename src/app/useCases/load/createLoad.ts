import { z } from 'zod';
import { loadStoreSchema } from '../../schemas/loadSchemas';
import { uploadImage } from '../../../utils/uploadImage';
import LoadRepository from '../../repositories/LoadRepository';
import { APPError } from '../../errors/APPError';
import ContractorRepository from '../../repositories/ContractorRepository';
import { findOrCreateAddress } from './findOrCreateAddress';

export async function createLoad(
  payload: z.infer<typeof loadStoreSchema>,
  images: Express.Multer.File[],
  userId: string,
) {
  const contractor = await ContractorRepository.findFirst({
    where: {
      user: {
        some: {
          id: userId,
        },
      },
    },
  });

  if (!contractor) {
    throw new APPError('contractor does not exists');
  }

  const deliveryAddressId = await findOrCreateAddress(
    payload.deliveryAddressId,
    payload.deliveryAddress && payload.deliveryAddress,
  );
  const pickupAddressId = await findOrCreateAddress(
    payload.pickupAddressId,
    payload.pickupAddress && payload.pickupAddress,
  );

  if (!deliveryAddressId) {
    throw new APPError(
      'you need to inform a valid deliveryId or pass data to create a new one',
    );
  }

  if (!pickupAddressId) {
    throw new APPError(
      'you need to inform a valid pickupAddress or pass data to create a new one',
    );
  }

  const loadFilesName = images
    ? await Promise.all(
        images.map((image) =>
          uploadImage(image, {
            height: 320,
          }),
        ),
      )
    : [];

  const load = await LoadRepository.create({
    contractorId: contractor.id,
    title: payload.title,
    type: payload.type,
    price: payload.price,
    length: payload.length,
    width: payload.width,
    height: payload.height,
    dimensionsUnit: payload.dimensionsUnit,
    weight: payload.weight,
    weightUnit: payload.weightUnit,
    description: payload.description,
    pickupAddressId,
    pickupDate: payload.pickupDate,
    deliveryAddressId,
    deliveryDate: payload.deliveryDate,
    loadImage: {
      createMany: {
        data: loadFilesName.map((url) => ({ url })),
      },
    },
  });

  return load;
}
