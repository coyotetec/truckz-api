import { Request, Response } from 'express';
import {
  driverStoreSchema,
  updateDriverSchema,
} from '../schemas/driverSchemas';
import { createDriver } from '../useCases/driver/createDriver';
import { updateDriver } from '../useCases/driver/updateDriver';

class DriverController {
  async store(req: Request, res: Response) {
    const data = driverStoreSchema.parse(req.body);
    const driver = await createDriver(data);

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
}

export default new DriverController();
