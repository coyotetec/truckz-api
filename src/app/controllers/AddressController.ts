import { Request, Response } from 'express';
import { findAddresses } from '../useCases/address/findAddresses';
import { addressSchema } from '../schemas/addressSchemas';
import { createAddress } from '../useCases/address/createAddress';

class AddressController {
  async index(req: Request, res: Response) {
    if (!req.userId) {
      return res.sendStatus(404);
    }

    const addresses = await findAddresses(req.userId);

    res.json(addresses);
  }

  async store(req: Request, res: Response) {
    if (!req.userId) {
      return res.sendStatus(404);
    }

    const data = addressSchema.parse(req.body);
    const address = await createAddress(data, req.userId);

    res.status(201).json(address);
  }
}

export default new AddressController();
