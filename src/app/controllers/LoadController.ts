import { Request, Response } from 'express';
import {
  loadCloseStatus,
  loadIndexSchema,
  loadStoreSchema,
  publicLoadsSchema,
} from '../schemas/loadSchemas';
import { createLoad } from '../useCases/load/createLoad';
import { findLoads } from '../useCases/load/findLoads';
import { findLoadById } from '../useCases/load/findLoadById';
import { closeLoad } from '../useCases/load/closeLoad';
import { updateLoad } from '../useCases/load/updateLoad';
import { APPError } from '../errors/APPError';
import { findPublicLoads } from '../useCases/load/findPublicLoads';

class LoadController {
  async index(req: Request, res: Response) {
    const filters = loadIndexSchema.safeParse(req.query);
    if (!req.userId || !req.accountType) {
      return res.sendStatus(500);
    }

    const loads = await findLoads(
      req.userId,
      req.accountType,
      filters.success ? filters.data : undefined,
    );

    res.json(loads);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const load = await findLoadById(id);

    res.json(load);
  }

  async store(req: Request, res: Response) {
    if (!req.userId) {
      return res.sendStatus(500);
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

    if (typeof req.body?.length === 'string') {
      req.body.length = Number(req.body.length);
    }

    if (typeof req.body?.height === 'string') {
      req.body.height = Number(req.body.height);
    }

    if (typeof req.body?.width === 'string') {
      req.body.width = Number(req.body.width);
    }

    if (typeof req.body?.weight === 'string') {
      req.body.weight = Number(req.body.weight);
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
      return res.sendStatus(500);
    }

    const status = loadCloseStatus.parse(req.body.status);

    await closeLoad(id, status, req.userId);

    res.sendStatus(204);
  }

  async update(req: Request, res: Response) {
    const { id: loadId } = req.params;
    if (!req.userId) {
      return res.sendStatus(500);
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

    if (typeof req.body?.length === 'string') {
      req.body.length = Number(req.body.length);
    }

    if (typeof req.body?.height === 'string') {
      req.body.height = Number(req.body.height);
    }

    if (typeof req.body?.width === 'string') {
      req.body.width = Number(req.body.width);
    }

    if (typeof req.body?.weight === 'string') {
      req.body.weight = Number(req.body.weight);
    }

    const dataUpdate = loadStoreSchema.parse(req.body);

    const loadUpdated = await updateLoad(
      req.userId,
      loadId,
      dataUpdate,
      req.files as Express.Multer.File[],
    );
    res.status(200).json(loadUpdated);
  }

  async publicLoads(req: Request, res: Response) {
    const coordinates = publicLoadsSchema.safeParse(req.query);
    if (!coordinates.success) {
      throw new APPError(
        'Não é possível fazer essa operação sem as coordenadas',
      );
    }

    const loads = await findPublicLoads(coordinates.data);
    return res.status(200).json(loads);
  }
}

export default new LoadController();
