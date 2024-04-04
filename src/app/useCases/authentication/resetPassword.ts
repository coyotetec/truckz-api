import { z } from 'zod';
import { resetPasswordSchema } from '../../schemas/authenticationSchemas';
import ResetTokenRepository from '../../repositories/ResetTokenRepository';
import { validatePassword } from '../../../utils/validatePassword';
import { APPError } from '../../errors/APPError';
import { hashPassword } from '../../../utils/hashPassword';
import UserRepository from '../../repositories/UserRepository';
import { sendEmail } from '../../../utils/sendEmail';

export async function resetPassword(data: z.infer<typeof resetPasswordSchema>) {
  const passwordResetToken = await ResetTokenRepository.findUnique({
    where: {
      userId: data.userId,
    },
  });

  if (!passwordResetToken) {
    throw new APPError('token de redefinição de senha inválido ou expirado');
  }

  const tokenIsValid = await validatePassword(
    data.token,
    passwordResetToken.token,
  );

  if (!tokenIsValid) {
    throw new APPError('token de redefinição de senha inválido ou expirado');
  }

  const hashedPassword = await hashPassword(data.password);

  const user = await UserRepository.update({
    where: {
      id: data.userId,
    },
    data: {
      password: hashedPassword,
    },
  });

  await sendEmail(
    user.email,
    'Senha Alterada com Sucesso',
    {
      name: user.driver?.fullName || user.contractor?.name || 'Amigo',
    },
    'passwordChanged',
  );

  await ResetTokenRepository.deleteById(passwordResetToken.id);
}
