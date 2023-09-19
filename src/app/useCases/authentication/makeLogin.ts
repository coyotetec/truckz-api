import { z } from 'zod';
import { loginSchema } from '../../schemas/authenticationSchemas';
import { APPError } from '../../errors/APPError';
import { validatePassword } from '../../../utils/validatePassword';
import UserRepository from '../../repositories/UserRepository';
import jwt from 'jsonwebtoken';

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

  return {
    token,
    type: accountType,
    user: {
      avatarUrl: `https://s3.amazonaws.com/truckz-test/${user.avatarUrl}`,
      ...(accountType === 'contractor' && {
        contractor: {
          name: user.contractor?.name,
        },
      }),
    },
  };
}
