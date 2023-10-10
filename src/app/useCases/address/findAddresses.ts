import AddressRepository from '../../repositories/AddressRepository';

export async function findAddresses(userId: string) {
  const addresses = await AddressRepository.findAll({
    where: {
      userId,
    },
  });

  const mappedAddresses = addresses.map((address) => ({
    ...address,
    latitude: address.latitude.toNumber(),
    longitude: address.longitude.toNumber(),
  }));

  return mappedAddresses;
}
