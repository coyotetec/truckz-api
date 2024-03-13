import { Request, Response } from 'express';
import { makeCheckin } from '../useCases/checkin/makeCheckin';
import { findCheckins } from '../useCases/checkin/findCheckins';
import {
  checkinIndexSchema,
  checkinStoreSchema,
} from '../schemas/checkinSchemas';
import { disableCheckin } from '../useCases/checkin/disableCheckin';
import { findCheckin } from '../useCases/checkin/findCheckin';

class CheckinController {
  async index(req: Request, res: Response) {
    const data = checkinIndexSchema.parse(req.query);
    const checkins = await findCheckins(data);

    return res.json(checkins);
  }

  async show(req: Request, res: Response) {
    if (!req.userId) {
      return res.sendStatus(404);
    }

    const { userId } = req.params;

    if (req.userId !== userId) {
      return res.status(401).json({ error: "you can't get this user checkin" });
    }

    const checkin = await findCheckin(req.userId);

    return res.json(checkin);
  }

  async store(req: Request, res: Response) {
    if (!req.userId) {
      return res.sendStatus(404);
    }

    const data = checkinStoreSchema.parse(req.body);
    const checkin = await makeCheckin(req.userId, data);

    return res.status(201).json(checkin);
  }

  async disable(req: Request, res: Response) {
    if (!req.userId) {
      return res.sendStatus(404);
    }

    await disableCheckin(req.userId);

    return res.sendStatus(200);
  }
}

export default new CheckinController();
