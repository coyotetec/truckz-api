import { APPError } from '../../errors/APPError';
import LoadRepository from '../../repositories/LoadRepository';

const storageBaseUrl = process.env.STORAGE_BASE_URL as string;

export async function findLoadById(id: string) {
  const load = await LoadRepository.findUnique({
    where: {
      id,
    },
  });

  if (!load) {
    throw new APPError('carga não encontrada');
  }

  const mappedLoad = {
    ...load,
    price: load.price.toNumber(),
    length: load.length?.toNumber(),
    width: load.width?.toNumber(),
    height: load.height?.toNumber(),
    weight: load.weight?.toNumber(),
    loadImages: load.loadImage.map((image) => `${storageBaseUrl}/${image.url}`),
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
