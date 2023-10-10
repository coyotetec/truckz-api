import { z } from 'zod';
import { APPError } from '../../errors/APPError';
import AddressRepository from '../../repositories/AddressRepository';
import CheckinRepository from '../../repositories/CheckinRepository';
import ContractorRepository from '../../repositories/ContractorRepository';
import LoadImageRepository from '../../repositories/LoadImageRepository';
import LoadRepository from '../../repositories/LoadRepository';
import UserRepository from '../../repositories/UserRepository';
import { loadIndexSchema } from '../../schemas/loadSchemas';

export async function findLoads(
  userId: string,
  accountType: 'driver' | 'contractor' | 'undefined',
  filters?: z.infer<typeof loadIndexSchema>,
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
      radius: filters?.radius || 250,
      originState: filters?.originState,
      originCity: filters?.originCity,
      destinationState: filters?.destinationState,
      destinationCity: filters?.destinationCity,
      type: filters?.type,
    });

    const mappedLoads = [];

    for (const load of loads) {
      const [
        pickupAddress,
        deliveryAddress,
        loadImages,
        contractor,
        user,
        contractorMainAddress,
      ] = await Promise.all([
        AddressRepository.findById(load.pickup_address_id),
        AddressRepository.findById(load.delivery_address_id),
        LoadImageRepository.findMany({
          where: {
            loadId: load.id,
          },
        }),
        ContractorRepository.findFirst({
          where: {
            id: load.contractor_id,
          },
        }),
        UserRepository.findFirst({
          where: {
            contractorId: load.contractor_id,
          },
        }),
        AddressRepository.findFirst({
          where: {
            name: 'Endereço Principal',
            userId,
          },
        }),
      ]);

      if (
        !pickupAddress ||
        !deliveryAddress ||
        !contractor ||
        !user ||
        !contractorMainAddress
      ) {
        continue;
      }

      mappedLoads.push({
        id: load.id,
        title: load.title,
        status: load.status,
        price: load.price.toNumber(),
        length: load.length?.toNumber(),
        width: load.width?.toNumber(),
        height: load.height?.toNumber(),
        dimensionsUnit: load.dimensions_unit,
        weight: load.weight?.toNumber(),
        weightUnit: load.weight_unit,
        description: load.description,
        createdAt: load.created_at,
        seenTimes: load.seen_times,
        contractorId: load.contractor_id,
        loadImages: loadImages.map(
          (image) => `https://truckz-test.s3.amazonaws.com/${image.url}`,
        ),
        pickupAddressId: load.pickup_address_id,
        pickupDate: load.pickup_date,
        pickupAddress: {
          id: pickupAddress.id,
          name: pickupAddress.name,
          zipcode: pickupAddress.zipcode,
          address: pickupAddress.address,
          number: pickupAddress.number,
          district: pickupAddress.district,
          reference: pickupAddress.reference,
          state: pickupAddress.state,
          city: pickupAddress.city,
          latitude: pickupAddress.latitude.toNumber(),
          longitude: pickupAddress.longitude.toNumber(),
          userId: pickupAddress.userId,
        },
        deliveryAddressId: load.delivery_address_id,
        deliveryDate: load.delivery_date,
        deliveryAddress: {
          id: deliveryAddress.id,
          name: deliveryAddress.name,
          zipcode: deliveryAddress.zipcode,
          address: deliveryAddress.address,
          number: deliveryAddress.number,
          district: deliveryAddress.district,
          reference: deliveryAddress.reference,
          state: deliveryAddress.state,
          city: deliveryAddress.city,
          latitude: deliveryAddress.latitude.toNumber(),
          longitude: deliveryAddress.longitude.toNumber(),
          userId: deliveryAddress.userId,
        },
        contractor: {
          id: contractor.id,
          name: contractor.name,
          cnpj: contractor.cnpj,
          cpf: contractor.cpf,
          stateRegistration: contractor.stateRegistration,
          phoneNumber: contractor.phoneNumber,
          whatsappNumber: contractor.whatsappNumber,
          avatarUrl: `https://truckz-test.s3.amazonaws.com/${user.avatarUrl}`,
          createdAt: user.createdAt,
          mainAddress: {
            city: contractorMainAddress.city,
            state: contractorMainAddress.state,
          },
        },
      });
    }

    return mappedLoads;
  }
}
