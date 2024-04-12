import { Request, Response } from 'express';
import { truckSchema } from '../schemas/truckSchemas';
import { findTrucks } from '../useCases/truck/findTrucks';
import { updateTruck } from '../useCases/truck/updateTruck';
import { createTruck } from '../useCases/truck/createTruck';
import { APPError } from '../errors/APPError';

class TruckController {
  async index(req: Request, res: Response) {
    const trucks = await findTrucks();
    return res.status(200).json(trucks);
  }

  async store(req: Request, res: Response) {
    if (req.accountType !== 'driver') {
      throw new APPError('Você não tem permissão para acessar essa rota');
    }

    if (typeof req.body?.axlesQty === 'string') {
      req.body.axlesQty = Number(req.body?.axlesQty);
    }

    const truckData = truckSchema.parse(req.body);

    const createdTruck = await createTruck({ truckData, userId: req.userId });

    return res.status(201).json(createdTruck);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    const dataTruck = truckSchema.parse(req.body);

    const updatedTruck = await updateTruck(req.userId, id, dataTruck);

    return res.status(200).json(updatedTruck);
  }
}

export default new TruckController();
