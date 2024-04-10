import { z } from 'zod';
import { updateUserSchema } from '../../schemas/userSchemas';
import { prisma } from '../../../libs/prisma';
import { APPError } from '../../errors/APPError';
import UserRepository from '../../repositories/UserRepository';
import { hashPassword } from '../../../utils/hashPassword';
import { uploadImage } from '../../../utils/uploadImage';
import { deleteImage } from '../../../utils/deleteImage';

const storageBaseUrl = process.env.STORAGE_BASE_URL as string;

export async function updateUser(
  payload: z.infer<typeof updateUserSchema>,
  userId: string,
  avatar?: Express.Multer.File,
) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      avatarUrl: true,
    },
  });

  if (!user) {
    throw new APPError('Usuário não encontrado');
  }

  const { avatarUrl } = user;

  const userAlreadyExists = await UserRepository.findFirst({
    where: {
      OR: [{ username: payload.username }, { email: payload.email }],
    },
  });

  if (userAlreadyExists && userAlreadyExists.id !== userId) {
    const sameFields = [
      ...(userAlreadyExists?.email === payload.email ? ['Email'] : []),
      ...(userAlreadyExists?.username === payload.username
        ? ['Nome de Usuário']
        : []),
    ];

    throw new APPError(
      `Os seguintes campos já estão em uso: ${sameFields.join(', ')}`,
    );
  }

  const formatedOriginalName = avatar?.originalname.split('.');

  let avatarFileName = avatarUrl;

  if (
    avatarUrl &&
    formatedOriginalName &&
    avatarUrl !== formatedOriginalName[0]
  ) {
    avatarFileName = avatar
      ? await uploadImage(avatar, {
          height: 200,
        })
      : '';
    await deleteImage(avatarUrl);
  }

  const hashedPassword = payload.password
    ? await hashPassword(payload.password)
    : null;

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      email: payload.email,
      username: payload.username,
      avatarUrl: avatarFileName,
      ...(hashedPassword && { password: hashedPassword }),
    },
  });

  updatedUser.avatarUrl = `${storageBaseUrl}/${updatedUser.avatarUrl}`;

  return updatedUser;
}
