import { Request, Response } from 'express';
import { loginSchema } from '../schemas/authenticationSchemas';
import { makeLogin } from '../useCases/authentication/makeLogin';

class AuthenticationController {
  async index(req: Request, res: Response) {
    const data = loginSchema.parse(req.body);

    const response = await makeLogin(data);

    return res.json(response);
  }
}

export default new AuthenticationController();
