import { Request, Response } from 'express';
import { driverStoreSchema } from '../schemas/driverSchemas';
import { createDriver } from '../useCases/driver/createDriver';

class DriverController {
  async store(req: Request, res: Response) {
    const data = driverStoreSchema.parse(req.body);
    const driver = await createDriver(data);

    res.status(201).json(driver);
  }
}

export default new DriverController();
