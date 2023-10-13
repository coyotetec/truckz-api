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

  if (!driver) throw new APPError('driver does not exists');

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
      ...(driverAlreadyExists?.cpf === payload.cpf ? ['cpf'] : []),
      ...(driverAlreadyExists?.cnhNumber === payload.cnhNumber
        ? ['cnhNumber']
        : []),
      ...(driverAlreadyExists?.rntrc === payload.rntrc ? ['rntrc'] : []),
    ];

    throw new APPError(
      `the following fields are already in user: ${sameFields.join(', ')}`,
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
