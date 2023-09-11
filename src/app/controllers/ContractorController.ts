import { Request, Response } from 'express';
import { contractorStoreSchema } from '../schemas/contractorSchemas';
import { createContractor } from '../useCases/contractor/createContractor';

class CompanyController {
  async store(req: Request, res: Response) {
    if (typeof req.body?.address === 'string') {
      req.body.address = JSON.parse(req.body.address);
    }

    const data = contractorStoreSchema.parse(req.body);
    const contractor = await createContractor(data, req.file);

    return res.status(201).json(contractor);
  }

  async username(req: Request, res: Response) {
    const { username } = req.params;

    const isAvailable = checkUsernameAvailable(username);

    return res.json({ isAvailable });
  }
}

export default new CompanyController();
