import UserRepository from '../../repositories/UserRepository';

export async function usernameAvailable(username: string) {
  const usernameDB = await UserRepository.findFirst({
    where: {
      username,
    },
  });

  if (!usernameDB) {
    return true;
  }

  return false;
}
