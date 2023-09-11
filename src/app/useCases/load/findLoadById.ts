import { APPError } from '../../errors/APPError';
import LoadRepository from '../../repositories/LoadRepository';

export async function findLoadById(id: string) {
  const load = await LoadRepository.findUnique({
    where: {
      id,
    },
  });

  if (!load) {
    throw new APPError('load does not exists');
  }

  return load;
}
