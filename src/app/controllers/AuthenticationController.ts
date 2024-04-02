import { Request, Response } from 'express';
import {
  loginSchema,
  requestResetSchema,
  resetPasswordSchema,
} from '../schemas/authenticationSchemas';
import { makeLogin } from '../useCases/authentication/makeLogin';
import { requestPasswordReset } from '../useCases/authentication/requestPasswordReset';
import { resetPassword } from '../useCases/authentication/resetPassword';

class AuthenticationController {
  async index(req: Request, res: Response) {
    const data = loginSchema.parse(req.body);

    const response = await makeLogin(data);

    return res.json(response);
  }

  async requestReset(req: Request, res: Response) {
    const data = requestResetSchema.parse(req.body);

    await requestPasswordReset(data);

    res.sendStatus(200);
  }

  async resetPassword(req: Request, res: Response) {
    const data = resetPasswordSchema.parse(req.body);

    await resetPassword(data);

    res.sendStatus(200);
  }
}

export default new AuthenticationController();
