import { Request, Response } from 'express';
import {
  driverStoreSchema,
  publicDriversSchema,
  updateDriverSchema,
} from '../schemas/driverSchemas';
import { createDriver } from '../useCases/driver/createDriver';
import { updateDriver } from '../useCases/driver/updateDriver';
import { findDriverByUserId } from '../useCases/driver/findDriverByUserId';
import { APPError } from '../errors/APPError';
import { findPublicDrivers } from '../useCases/driver/findPublicDrivers';

class DriverController {
  async show(req: Request, res: Response) {
    if (!req.userId) {
      return res.sendStatus(404);
    }

    const { userId } = req.params;

    if (req.userId !== userId) {
      return res.status(401).json({ error: "you can't get this user data" });
    }

    const driver = await findDriverByUserId(userId);

    return res.json(driver);
  }

  async store(req: Request, res: Response) {
    if (typeof req.body?.address === 'string') {
      req.body.address = JSON.parse(req.body.address);
    }

    if (typeof req.body?.truck === 'string') {
      req.body.truck = JSON.parse(req.body.truck);
    }

    if (typeof req.body?.truck.axlesQty === 'string') {
      req.body.truck.axlesQty = Number(req.body?.truck.axlesQty);
    }

    const data = driverStoreSchema.parse(req.body);
    const driver = await createDriver(data, req.file);

    res.status(201).json(driver);
  }

  async update(req: Request, res: Response) {
    if (!req.userId) {
      return res.sendStatus(500);
    }

    const dataToUpdate = updateDriverSchema.parse(req.body);

    const updatedDriver = await updateDriver(req.userId, dataToUpdate);
    res.status(200).json(updatedDriver);
  }

  async publicDrivers(req: Request, res: Response) {
    const coordinates = publicDriversSchema.safeParse(req.query);
    if (!coordinates.success) throw new APPError('Coordinates not found');
    const drivers = await findPublicDrivers(coordinates.data);
    return res.status(200).json(drivers);
  }
}

export default new DriverController();
