import { Request, Response } from 'express';
import { findAddresses } from '../useCases/address/findAddresses';
import { addressSchema } from '../schemas/addressSchemas';
import { createAddress } from '../useCases/address/createAddress';
import { findAddressById } from '../useCases/address/findAddressById';
import { updateAddress } from '../useCases/address/updateAddress';
import { deleteAddress } from '../useCases/address/deleteAddress';

class AddressController {
  async index(req: Request, res: Response) {
    if (!req.userId) {
      return res.sendStatus(500);
    }

    const addresses = await findAddresses(req.userId);

    res.json(addresses);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const address = await findAddressById(id);

    res.json(address);
  }

  async store(req: Request, res: Response) {
    if (!req.userId) {
      return res.sendStatus(500);
    }

    const data = addressSchema.parse(req.body);
    const address = await createAddress(data, req.userId);

    res.status(201).json(address);
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
      userId,
    });

    res.status(200).json(addressUpdated);
  }

  async destroy(req: Request, res: Response) {
    const { userId } = req;
    const { id } = req.params;

    if (!userId) {
      return res.sendStatus(500);
    }

    await deleteAddress(id, userId);

    res.send(204);
  }
}

export default new AddressController();
