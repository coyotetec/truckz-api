import { Request, Response } from 'express';
import { loadCloseStatus, loadStoreSchema } from '../schemas/loadSchemas';
import { createLoad } from '../useCases/load/createLoad';
import { findLoads } from '../useCases/load/findLoads';
import { findLoadById } from '../useCases/load/findLoadById';
import { closeLoad } from '../useCases/load/closeLoad';
import { updateLoad } from '../useCases/load/updateLoad';

class LoadController {
  async index(req: Request, res: Response) {
    if (!req.userId) {
      return res.sendStatus(404);
    }

    const loads = await findLoads(req.userId);

    res.json(loads);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const load = await findLoadById(id);

    res.json(load);
  }

  async store(req: Request, res: Response) {
    if (!req.userId) {
      return res.sendStatus(404);
    }

    if (typeof req.body?.pickupAddress === 'string') {
      req.body.pickupAddress = JSON.parse(req.body.pickupAddress);
    }

    if (typeof req.body?.deliveryAddress === 'string') {
      req.body.deliveryAddress = JSON.parse(req.body.deliveryAddress);
    }

    if (typeof req.body?.price === 'string') {
      req.body.price = Number(req.body.price);
    }

    const data = loadStoreSchema.parse(req.body);
    const load = await createLoad(
      data,
      req.files as Express.Multer.File[],
      req.userId,
    );

    res.status(201).json(load);
  }

  async close(req: Request, res: Response) {
    const { id } = req.params;
    if (!req.userId) {
      return res.sendStatus(404);
    }

    const status = loadCloseStatus.parse(req.body.status);

    await closeLoad(id, status);

    res.sendStatus(204);
  }

  async update(req: Request, res: Response) {
    const { id: loadId } = req.params;
    if (!req.userId) {
      return res.sendStatus(404);
    }

    const dataUpdate = loadStoreSchema.parse(req.body);

    await updateLoad(req.userId, loadId, dataUpdate);
    res.sendStatus(204);
  }
}

export default new LoadController();
