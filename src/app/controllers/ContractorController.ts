import { Request, Response } from 'express';
import {
  contractorStoreSchema,
  updateContratorSchema,
} from '../schemas/contractorSchemas';
import { createContractor } from '../useCases/contractor/createContractor';
import { updateContractor } from '../useCases/contractor/updateContractor';
import { findContractor } from '../useCases/contractor/findContractor';

class CompanyController {
  async show(req: Request, res: Response) {
    if (!req.userId) {
      return res.sendStatus(404);
    }

    const contractor = await findContractor(req.userId);

    return res.json(contractor);
  }

  async store(req: Request, res: Response) {
    if (typeof req.body?.address === 'string') {
      req.body.address = JSON.parse(req.body.address);
    }

    const data = contractorStoreSchema.parse(req.body);
    const contractor = await createContractor(data, req.file);

    return res.status(201).json(contractor);
  }

  async update(req: Request, res: Response) {
    if (!req.userId) {
      return res.sendStatus(500);
    }

    const dataToUpdate = updateContratorSchema.parse(req.body);
    const contractorUpdated = await updateContractor(dataToUpdate, req.userId);
    return res.status(200).json(contractorUpdated);
  }
}

export default new CompanyController();
