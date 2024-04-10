import { z } from 'zod';
import { APPError } from '../../errors/APPError';
import { updateDriverSchema } from '../../schemas/driverSchemas';
import DriverRepository from '../../repositories/DriverRepository';

export async function updateDriver(
  userId: string,
  payload: z.infer<typeof updateDriverSchema>,
) {
  const driver = await DriverRepository.findFirst({
    where: {
      user: {
        id: userId,
      },
    },
  });

  if (!driver) throw new APPError('Motorista não encontrado');

  const driverAlreadyExists = await DriverRepository.findFirst({
    where: {
      OR: [
        { cpf: payload.cpf },
        { cnhNumber: payload.cnhNumber },
        { rntrc: payload.rntrc },
      ],
    },
  });

  if (driverAlreadyExists && driver.id !== driverAlreadyExists.id) {
    const sameFields = [
      ...(driverAlreadyExists?.cpf === payload.cpf ? ['CPF'] : []),
      ...(driverAlreadyExists?.cnhNumber === payload.cnhNumber
        ? ['Número da CNH']
        : []),
      ...(driverAlreadyExists?.rntrc === payload.rntrc ? ['RNTRC'] : []),
    ];

    throw new APPError(
      `Os seguintes campos já estão em uso: ${sameFields.join(', ')}`,
    );
  }

  const updatedDriver = await DriverRepository.update({
    where: {
      id: driver.id,
    },
    data: {
      fullName: payload.fullName,
      birthDate: payload.birthDate,
      cnhNumber: payload.cnhNumber,
      cnhCategory: payload.cnhCategory,
      rntrc: payload.rntrc,
      phoneNumber: payload.phoneNumber,
      whatsappNumber: payload.whatsappNumber || payload.phoneNumber,
    },
  });

  return updatedDriver;
}
