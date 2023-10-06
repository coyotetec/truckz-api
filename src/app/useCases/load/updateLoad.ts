import { z } from 'zod';
import { loadStoreSchema } from '../../schemas/loadSchemas';
import { APPError } from '../../errors/APPError';
import { findOrCreateAddress } from './findOrCreateAddress';
import { evaluatesDeletedImages } from '../../../utils/evaluatesDeletedImages';
import { evaluatesNewImages } from '../../../utils/evaluatesNewImages';
import { deleteImage } from '../../../utils/deleteImage';
import { uploadImage } from '../../../utils/uploadImage';
import LoadRepository from '../../repositories/LoadRepository';
import LoadImageRepository from '../../repositories/LoadImageRepository';

export async function updateLoad(
  userId: string,
  loadId: string,
  payload: z.infer<typeof loadStoreSchema>,
  images: Express.Multer.File[],
) {
  const load = await LoadRepository.findFirst({
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

  const imagesDB = await LoadImageRepository.findMany({
    where: {
      loadId,
    },
  });

  const urlImagesDbSet = new Set(imagesDB.map(({ url }) => url));

  const newImages = images && evaluatesNewImages(urlImagesDbSet, images);

  const namesImagesMulterSet =
    images &&
    new Set(
      images.map(({ originalname }) => {
        const formatName = originalname.split('.');
        return formatName[0];
      }),
    );

  const imagesNameDeleted = evaluatesDeletedImages(
    namesImagesMulterSet,
    imagesDB,
  );

  imagesNameDeleted &&
    (await Promise.all(
      imagesNameDeleted.map((nameImage) => deleteImage(nameImage)),
    ));

  await LoadImageRepository.deleteMany({
    where: {
      url: {
        in: imagesNameDeleted,
      },
    },
  });

  const newLoadImages = newImages
    ? await Promise.all(
        newImages.map((image) =>
          uploadImage(image, {
            height: 320,
          }),
        ),
      )
    : [];

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

  const updateLoad = await LoadRepository.update({
    where: {
      id: loadId,
    },
    data: {
      contractorId: load.contractorId,
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
      pickupAddressId: pickupAddress.id,
      pickupDate: payload.pickupDate,
      deliveryAddressId: deliveryAddress.id,
      deliveryDate: payload.deliveryDate,
      loadImage: {
        createMany: {
          data: newLoadImages.map((url) => ({ url })),
        },
      },
    },
  });

  return updateLoad;
}
