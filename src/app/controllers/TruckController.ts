import { Request, Response } from 'express';
import { truckSchema } from '../schemas/truckSchemas';
import { updateTruck } from '../useCases/truck/updateTruck';

class TruckController {
  async update(req: Request, res: Response) {
    const { id } = req.params;
    if (!req.userId) {
      return res.sendStatus(500);
    }

    const dataTruck = truckSchema.parse(req.body);

    const updatedTruck = await updateTruck(req.userId, id, dataTruck);

    return res.status(200).json(updatedTruck);
  }
}

export default new TruckController();
