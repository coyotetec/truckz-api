import { Request, Response } from 'express';
import { truckSchema } from '../schemas/truckSchemas';
import { findTrucks } from '../useCases/truck/findTrucks';
import { updateTruck } from '../useCases/truck/updateTruck';

class TruckController {
  async index(req: Request, res: Response) {
    const trucks = await findTrucks();
    return res.status(200).json(trucks);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    const dataTruck = truckSchema.parse(req.body);

    const updatedTruck = await updateTruck(req.userId, id, dataTruck);

    return res.status(200).json(updatedTruck);
  }
}

export default new TruckController();
