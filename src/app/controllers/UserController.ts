import { Request, Response } from 'express';
import { usernameAvailable } from '../useCases/user/usernameAvailable';
import { updateUser } from '../useCases/user/updateUser';
import { updateUserSchema } from '../schemas/userSchemas';

class UserController {
  async username(req: Request, res: Response) {
    const { username } = req.params;

    const isAvailable = await usernameAvailable(username);

    return res.json({ available: isAvailable });
  }

  async update(req: Request, res: Response) {
    if (!req.userId) {
      return res.sendStatus(500);
    }
    const dataToUpdate = updateUserSchema.parse(req.body);

    const updatedUser = await updateUser(dataToUpdate, req.userId, req.file);

    return res.status(200).json(updatedUser);
  }
}

export default new UserController();
