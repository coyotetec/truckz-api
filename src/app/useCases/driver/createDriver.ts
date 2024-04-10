import { z } from 'zod';
import { driverStoreSchema } from '../../schemas/driverSchemas';
import UserRepository from '../../repositories/UserRepository';
import DriverRepository from '../../repositories/DriverRepository';
import { APPError } from '../../errors/APPError';
import { hashPassword } from '../../../utils/hashPassword';
import { uploadImage } from '../../../utils/uploadImage';

export async function createDriver(
  payload: z.infer<typeof driverStoreSchema>,
  avatar?: Express.Multer.File,
) {
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
      ...(driverAlreadyExists?.cpf === payload.cpf ? ['CPF'] : []),
      ...(driverAlreadyExists?.cnhNumber === payload.cnhNumber
        ? ['Número daa CNH']
        : []),
      ...(driverAlreadyExists?.rntrc === payload.rntrc ? ['RNTRC'] : []),
      ...(userAlreadyExists?.email === payload.email ? ['Email'] : []),
      ...(userAlreadyExists?.username === payload.username
        ? ['Nome de Usuário']
        : []),
    ];

    throw new APPError(
      `Os seguintes campos já estão em uso: ${sameFields.join(', ')}`,
    );
  }

  const avatarFileName = avatar
    ? await uploadImage(avatar, {
        height: 200,
      })
    : '';
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
        avatarUrl: avatarFileName,
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
