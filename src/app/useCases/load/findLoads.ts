import { APPError } from '../../errors/APPError';
import CheckinRepository from '../../repositories/CheckinRepository';
import LoadRepository from '../../repositories/LoadRepository';

export async function findLoads(
  userId: string,
  accountType: 'driver' | 'contractor' | 'undefined',
) {
  if (accountType === 'contractor') {
    const loads = await LoadRepository.findAll({
      where: {
        contractor: {
          user: {
            some: {
              id: userId,
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const mappedLoads = loads.map((load) => ({
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
    }));

    return mappedLoads;
  }

  if (accountType === 'driver') {
    const lastCheckin = await CheckinRepository.findFirst({
      where: {
        driver: {
          userId,
        },
        active: true,
      },
    });

    if (!lastCheckin) {
      throw new APPError('the driver needs to have an active checkin');
    }

    const loads = await LoadRepository.findClose({
      latitude: Number(lastCheckin.latitude),
      longitude: Number(lastCheckin.longitude),
      radius: 200,
    });

    return loads;
  }
}
