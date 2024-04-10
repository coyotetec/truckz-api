import DriverRepository from '../../repositories/DriverRepository';

interface IFindPublicDriversArgs {
  lat: string;
  lng: string;
}

const storageBaseUrl = process.env.STORAGE_BASE_URL as string;

export async function findPublicDrivers(payload: IFindPublicDriversArgs) {
  const drivers = await DriverRepository.findPublic(payload);

  const mappedDrivers = drivers.map((driver) => ({
    id: driver.id,
    active: driver.active,
    latitude: driver.latitude.toNumber(),
    longitude: driver.longitude.toNumber(),
    city: driver.city,
    state: driver.state,
    checkinAt: driver.checkin_at,
    driverId: driver.driver_id,
    fullName: driver.full_name,
    phoneNumber: driver.phone_number,
    whatsappNumber: driver.whatsapp_number,
    ...(driver.avatar_url && {
      avatarUrl: `${storageBaseUrl}/${driver.avatar_url}`,
    }),
  }));

  return mappedDrivers;
}
