import { z } from 'zod';
import { loginSchema } from '../../schemas/authenticationSchemas';
import { APPError } from '../../errors/APPError';
import { validatePassword } from '../../../utils/validatePassword';
import UserRepository from '../../repositories/UserRepository';
import jwt from 'jsonwebtoken';
import CheckinRepository from '../../repositories/CheckinRepository';

interface ContractorResponse {
  name: string;
}

interface DriverResponse {
  name: string;
  lastCheckin?: {
    id: string;
    active: boolean;
    latitude: number;
    longitude: number;
    city: string;
    state: string;
    checkinAt: Date;
    driverId: string;
  };
}

export async function makeLogin(data: z.infer<typeof loginSchema>) {
  const user = await UserRepository.findFirst({
    where: {
      OR: [
        {
          username: data.username,
        },
        {
          contractor: {
            OR: [{ cpf: data.cpf }, { cnpj: data.cnpj }],
          },
        },
        {
          driver: {
            cpf: data.cpf,
          },
        },
      ],
    },
  });

  if (!user) {
    throw new APPError('user does not exists');
  }

  const samePassword = await validatePassword(data.password, user.password);

  if (!samePassword) {
    throw new APPError('incorrect password');
  }

  const accountType = user.driver
    ? 'driver'
    : user.contractor
    ? 'contractor'
    : 'undefined';
  const secret = process.env.JWT_SECRET as string;
  const token = jwt.sign(
    {
      id: user.id,
      accountType,
    },
    secret,
  );

  const contractor: ContractorResponse = {
    name: user.contractor?.name || '',
  };
  const driver: DriverResponse = {
    name: user.driver?.fullName || '',
  };

  if (accountType === 'driver') {
    const lastCheckin = await CheckinRepository.findFirst({
      where: {
        active: true,
        driverId: user.driver?.id,
      },
    });

    if (lastCheckin) {
      driver.lastCheckin = {
        ...lastCheckin,
        latitude: lastCheckin.latitude.toNumber(),
        longitude: lastCheckin.longitude.toNumber(),
      };
    }
  }

  return {
    token,
    type: accountType,
    user: {
      id: user.id,
      ...(user.avatarUrl && {
        avatarUrl: `https://s3.amazonaws.com/truckz-test/${user.avatarUrl}`,
      }),
      ...(accountType === 'contractor' && {
        contractor,
      }),
      ...(accountType === 'driver' && {
        driver,
      }),
    },
  };
}
