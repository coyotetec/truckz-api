import LoadAddressRepository from '../../repositories/LoadAddressRepository';
import LoadImageRepository from '../../repositories/LoadImageRepository';
import LoadRepository from '../../repositories/LoadRepository';
import UserRepository from '../../repositories/UserRepository';

interface IFindPublicLoadsArgs {
  lat: string;
  lng: string;
}

const storageBaseUrl = process.env.STORAGE_BASE_URL as string;

export async function findPublicLoads(payload: IFindPublicLoadsArgs) {
  const loads = await LoadRepository.findPublic(payload);

  const mappedLoads = [];

  for (const load of loads) {
    const [pickupAddress, deliveryAddress, loadImages, user] =
      await Promise.all([
        LoadAddressRepository.findById(load.pickup_address_id),
        LoadAddressRepository.findById(load.delivery_address_id),
        LoadImageRepository.findMany({
          where: {
            loadId: load.id,
          },
        }),
        UserRepository.findFirst({
          where: {
            contractorId: load.contractor_id,
          },
        }),
      ]);

    if (!pickupAddress || !deliveryAddress || !user) {
      continue;
    }

    mappedLoads.push({
      id: load.id,
      title: load.title,
      status: load.status,
      type: load.type,
      price: load.price.toNumber(),
      createdAt: load.created_at,
      loadImages: loadImages.map((image) => `${storageBaseUrl}/${image.url}`),
      pickupAddress: {
        id: pickupAddress.id,
        state: pickupAddress.state,
        city: pickupAddress.city,
      },
      deliveryAddress: {
        id: deliveryAddress.id,
        state: deliveryAddress.state,
        city: deliveryAddress.city,
      },
      ...(user.avatarUrl && {
        avatarUrl: `${storageBaseUrl}/${user.avatarUrl}`,
      }),
    });
  }

  return mappedLoads;
}
