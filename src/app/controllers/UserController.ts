import { Request, Response } from 'express';
import { usernameAvailable } from '../useCases/user/usernameAvailable';
import { updateUser } from '../useCases/user/updateUser';
import { updateUserSchema } from '../schemas/userSchemas';
import { findUserById } from '../useCases/user/findUserById';
import { APPError } from '../errors/APPError';
import { deleteUser } from '../useCases/user/deleteUser';

class UserController {
  async show(req: Request, res: Response) {
    if (!req.userId) {
      return res.sendStatus(404);
    }

    const { id } = req.params;

    if (req.userId !== id) {
      return res.status(401).json({
        error: 'Não é possível fazer esta operação sem o id do usuário',
      });
    }

    const user = await findUserById(id);

    return res.json(user);
  }

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

  async destroy(req: Request, res: Response) {
    if (!req.userId) {
      return res.sendStatus(404);
    }

    const password = req.body.password;

    if (!password) {
      throw new APPError('Senha é um campo obrigatório');
    }

    await deleteUser(req.userId, password);

    return res.sendStatus(200);
  }
}

export default new UserController();
