import { z } from 'zod';
import { loadCloseStatus } from '../../schemas/loadSchemas';
import LoadRepository from '../../repositories/LoadRepository';
import { APPError } from '../../errors/APPError';

export async function closeLoad(
  id: string,
  status: z.infer<typeof loadCloseStatus>,
) {
  const load = await LoadRepository.findUnique({
    where: {
      id,
    },
  });

  if (!load) {
    throw new APPError('load does not exists');
  }

  await LoadRepository.updateUnique(id, {
    status,
  });
}
