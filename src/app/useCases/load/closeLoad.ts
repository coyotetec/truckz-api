import { z } from 'zod';
import { loadCloseStatus } from '../../schemas/loadSchemas';
import LoadRepository from '../../repositories/LoadRepository';
import { APPError } from '../../errors/APPError';

export async function closeLoad(
  loadId: string,
  status: z.infer<typeof loadCloseStatus>,
  userId: string,
) {
  const load = await LoadRepository.findFirst({
    where: {
      id: loadId,
      contractor: {
        user: {
          some: {
            id: userId,
          },
        },
      },
    },
  });

  if (!load) {
    throw new APPError('carga não encontrada');
  }

  await LoadRepository.updateUnique(loadId, {
    status,
  });
}
