import { Request, Response } from 'express';
import { loginSchema } from '../schemas/authenticationSchemas';
import { makeLogin } from '../useCases/authentication/makeLogin';

class AuthenticationController {
  async index(req: Request, res: Response) {
    const data = loginSchema.parse(req.body);

    const token = await makeLogin(data);

    return res.json({ token });
  }
}

export default new AuthenticationController();
