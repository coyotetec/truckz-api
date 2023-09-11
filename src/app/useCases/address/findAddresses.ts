import AddressRepository from '../../repositories/AddressRepository';

export async function findAddresses(userId: string) {
  const addresses = await AddressRepository.findAll({
    where: {
      userId,
    },
  });

  return addresses;
}
