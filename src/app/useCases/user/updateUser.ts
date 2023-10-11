import { z } from 'zod';
import { updateUserSchema } from '../../schemas/userSchemas';
import { prisma } from '../../../libs/prisma';
import { APPError } from '../../errors/APPError';
import UserRepository from '../../repositories/UserRepository';
import { hashPassword } from '../../../utils/hashPassword';
import { uploadImage } from '../../../utils/uploadImage';
import { deleteImage } from '../../../utils/deleteImage';

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
    throw new APPError('user does not exists');
  }

  const { avatarUrl } = user;

  const userAlreadyExists = await UserRepository.findFirst({
    where: {
      OR: [{ username: payload.username }, { email: payload.email }],
    },
  });

  if (userAlreadyExists && userAlreadyExists.id !== userId) {
    const sameFields = [
      ...(userAlreadyExists?.email === payload.email ? ['email'] : []),
      ...(userAlreadyExists?.username === payload.username ? ['username'] : []),
    ];

    throw new APPError(
      `the following fields are already in use: ${sameFields.join(', ')}`,
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
  } else {
    avatarUrl && deleteImage(avatarUrl);
  }

  const hashedPassword = await hashPassword(payload.password);

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      email: payload.email,
      username: payload.username,
      password: hashedPassword,
      avatarUrl: avatarFileName,
    },
  });

  return updatedUser;
}
