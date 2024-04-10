import crypto from 'node:crypto';
import { z } from 'zod';
import { APPError } from '../../errors/APPError';
import { requestResetSchema } from '../../schemas/authenticationSchemas';
import ResetTokenRepository from '../../repositories/ResetTokenRepository';
import UserRepository from '../../repositories/UserRepository';
import { hashPassword } from '../../../utils/hashPassword';
import { sendEmail } from '../../../utils/sendEmail';

const resetPasswordUrl = process.env.RESET_PASSWORD_URL as string;

export async function requestPasswordReset(
  data: z.infer<typeof requestResetSchema>,
) {
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
    throw new APPError('Usuário incorreto');
  }

  const resetTokenAlreadyExists = await ResetTokenRepository.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (resetTokenAlreadyExists) {
    await ResetTokenRepository.deleteById(resetTokenAlreadyExists.id);
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedResetToken = await hashPassword(resetToken);

  await ResetTokenRepository.create({
    userId: user.id,
    token: hashedResetToken,
  });

  const link = `${resetPasswordUrl}?token=${resetToken}&id=${user.id}`;

  await sendEmail(
    user.email,
    'Solicitação de Redefinição de Senha',
    { name: user.driver?.fullName || user.contractor?.name || 'Amigo', link },
    'requestResetPassword',
  );
}
