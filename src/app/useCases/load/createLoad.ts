import { z } from 'zod';
import { loadStoreSchema } from '../../schemas/loadSchemas';
import AddressRepository from '../../repositories/AddressRepository';
import { uploadImage } from '../../../utils/uploadImage';
import LoadRepository from '../../repositories/LoadRepository';
import { APPError } from '../../errors/APPError';
import ContractorRepository from '../../repositories/ContractorRepository';

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

  const deliveryAddress = payload.deliveryAddressId
    ? await AddressRepository.findById(payload.deliveryAddressId)
    : payload.deliveryAddress
    ? await AddressRepository.create({
        name: 'Endereço Delivery',
        zipcode: payload.deliveryAddress.zipcode,
        address: payload.deliveryAddress.address,
        number: payload.deliveryAddress.number,
        district: payload.deliveryAddress.district,
        reference: payload.deliveryAddress.reference,
        state: payload.deliveryAddress.state,
        city: payload.deliveryAddress.city,
        latitude: payload.deliveryAddress.latitude,
        longitude: payload.deliveryAddress.longitude,
      })
    : null;
  const pickupAddress = payload.pickupAddressId
    ? await AddressRepository.findById(payload.pickupAddressId)
    : payload.pickupAddress
    ? await AddressRepository.create({
        name: 'Endereço Pickup',
        zipcode: payload.pickupAddress.zipcode,
        address: payload.pickupAddress.address,
        number: payload.pickupAddress.number,
        district: payload.pickupAddress.district,
        reference: payload.pickupAddress.reference,
        state: payload.pickupAddress.state,
        city: payload.pickupAddress.city,
        latitude: payload.pickupAddress.latitude,
        longitude: payload.pickupAddress.longitude,
      })
    : null;

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

  const loadFilesName = await Promise.all(
    images.map((image) =>
      uploadImage(image, {
        height: 320,
      }),
    ),
  );

  const load = await LoadRepository.create({
    contractorId: contractor.id,
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
    loadImage: {
      createMany: {
        data: loadFilesName.map((url) => ({ url })),
      },
    },
  });

  return load;
}
