import { Request, Response } from 'express';
import { findAddresses } from '../useCases/address/findAddresses';
import { updateAddress } from '../useCases/address/updateAddress';
import { addressSchema } from '../schemas/addressSchemas';

class AddressController {
  async index(req: Request, res: Response) {
    if (!req.userId) {
      return res.sendStatus(404);
    }

    const addresses = await findAddresses(req.userId);

    res.json(addresses);
  }

  async update(req: Request, res: Response) {
    const { userId } = req;
    const { id } = req.params;

    if (!userId) {
      return res.sendStatus(404);
    }
    const addressData = addressSchema.parse(req.body);

    const addressUpdated = await updateAddress({
      addressId: id,
      addressData,
    });

    res.status(204).json(addressUpdated);
  }
}

export default new AddressController();
