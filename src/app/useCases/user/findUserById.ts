import { APPError } from '../../errors/APPError';
import UserRepository from '../../repositories/UserRepository';

export async function findUserById(id: string) {
  const user = await UserRepository.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new APPError('user does not exists');
  }

  const mappedUser = {
    ...user,
    ...(user.avatarUrl && {
      avatarUrl: `https://truckz-test.s3.amazonaws.com/${user.avatarUrl}`,
    }),
  };

  return mappedUser;
}
