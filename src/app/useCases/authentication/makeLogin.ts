import { z } from 'zod';
import { loginSchema } from '../../schemas/authenticationSchemas';
import { APPError } from '../../errors/APPError';
import { validatePassword } from '../../../utils/validatePassword';
import UserRepository from '../../repositories/UserRepository';
import jwt from 'jsonwebtoken';

export async function makeLogin(data: z.infer<typeof loginSchema>) {
  const user = await UserRepository.findFirst({
    include: {
      driver: true,
      contractor: true,
    },
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

  const secret = process.env.JWT_SECRET as string;
  const token = jwt.sign(
    {
      id: user.id,
    },
    secret,
  );

  return token;
}
