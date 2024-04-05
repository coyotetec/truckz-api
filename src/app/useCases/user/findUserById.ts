import { APPError } from '../../errors/APPError';
import UserRepository from '../../repositories/UserRepository';

const storageBaseUrl = process.env.STORAGE_BASE_URL as string;

export async function findUserById(id: string) {
  const user = await UserRepository.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new APPError('Usuário não existe');
  }

  const mappedUser = {
    ...user,
    ...(user.avatarUrl && {
      avatarUrl: `${storageBaseUrl}/${user.avatarUrl}`,
    }),
  };

  return mappedUser;
}
