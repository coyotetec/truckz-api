import { Request, Response } from 'express';
import { findAddresses } from '../useCases/address/findAddresses';

class AddressController {
  async index(req: Request, res: Response) {
    if (!req.userId) {
      return res.sendStatus(404);
    }

    const addresses = await findAddresses(req.userId);

    res.json(addresses);
  }
}

export default new AddressController();
