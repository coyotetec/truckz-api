import { APPError } from '../../errors/APPError';
import LoadRepository from '../../repositories/LoadRepository';

export async function findLoadById(id: string) {
  const load = await LoadRepository.findUnique({
    where: {
      id,
    },
  });

  if (!load) {
    throw new APPError('load does not exists');
  }

  const mappedLoad = {
    ...load,
    price: load.price.toNumber(),
    length: load.length?.toNumber(),
    width: load.width?.toNumber(),
    height: load.height?.toNumber(),
    weight: load.weight?.toNumber(),
    loadImages: load.loadImage.map(
      (image) => `https://truckz-test.s3.amazonaws.com/${image.url}`,
    ),
    pickupAddress: {
      ...load.pickupAddress,
      latitude: load.pickupAddress.latitude.toNumber(),
      longitude: load.pickupAddress.longitude.toNumber(),
    },
    deliveryAddress: {
      ...load.deliveryAddress,
      latitude: load.deliveryAddress.latitude.toNumber(),
      longitude: load.deliveryAddress.longitude.toNumber(),
    },
  };

  return mappedLoad;
}
