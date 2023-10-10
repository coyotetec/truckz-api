import { z } from 'zod';
import { driverStoreSchema } from '../../schemas/driverSchemas';
import UserRepository from '../../repositories/UserRepository';
import DriverRepository from '../../repositories/DriverRepository';
import { APPError } from '../../errors/APPError';
import { hashPassword } from '../../../utils/hashPassword';

export async function createDriver(payload: z.infer<typeof driverStoreSchema>) {
  const userAlreadyExists = await UserRepository.findFirst({
    where: {
      OR: [{ username: payload.username }, { email: payload.email }],
    },
  });
  const driverAlreadyExists = await DriverRepository.findFirst({
    where: {
      OR: [
        { cpf: payload.cpf },
        { cnhNumber: payload.cnhNumber },
        { rntrc: payload.rntrc },
      ],
    },
  });

  if (driverAlreadyExists || userAlreadyExists) {
    const sameFields = [
      ...(driverAlreadyExists?.cpf === payload.cpf ? ['cpf'] : []),
      ...(driverAlreadyExists?.cnhNumber === payload.cnhNumber
        ? ['cnhNumber']
        : []),
      ...(driverAlreadyExists?.rntrc === payload.rntrc ? ['rntrc'] : []),
      ...(userAlreadyExists?.email === payload.email ? ['email'] : []),
      ...(userAlreadyExists?.username === payload.username ? ['username'] : []),
    ];

    throw new APPError(
      `the following fields are already in user: ${sameFields.join(', ')}`,
    );
  }

  const hashedPassword = await hashPassword(payload.password);

  const driver = await DriverRepository.create({
    fullName: payload.fullName,
    cpf: payload.cpf,
    birthDate: payload.birthDate,
    phoneNumber: payload.phoneNumber,
    whatsappNumber: payload.whatsappNumber || payload.phoneNumber,
    rntrc: payload.rntrc,
    cnhNumber: payload.cnhNumber,
    cnhCategory: payload.cnhCategory,
    user: {
      create: {
        email: payload.email,
        username: payload.username,
        password: hashedPassword,
        avatarUrl: '',
        address: {
          create: {
            name: 'Endereço Principal',
            zipcode: payload.address.zipcode,
            address: payload.address.address,
            number: payload.address.number,
            district: payload.address.district,
            reference: payload.address.reference,
            state: payload.address.state,
            city: payload.address.city,
            latitude: payload.address.latitude,
            longitude: payload.address.longitude,
          },
        },
      },
    },
    truck: {
      create: {
        renavam: payload.truck.renavam,
        plate: payload.truck.plate,
        model: payload.truck.model,
        type: payload.truck.type,
        crvNumber: payload.truck.crvNumber,
        holderName: payload.truck.holderName,
        holderCpf: payload.truck.holderCpf,
        holderCnpj: payload.truck.holderCnpj,
        axlesQty: payload.truck.axlesQty,
        tracker: payload.truck.tracker,
      },
    },
  });

  return driver;
}
