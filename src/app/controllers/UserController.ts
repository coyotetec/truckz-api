import { Request, Response } from 'express';
import { usernameAvailable } from '../useCases/user/usernameAvailable';

class UserController {
  async username(req: Request, res: Response) {
    const { username } = req.params;

    const isAvailable = await usernameAvailable(username);

    return res.json({ available: isAvailable });
  }
}

export default new UserController();
