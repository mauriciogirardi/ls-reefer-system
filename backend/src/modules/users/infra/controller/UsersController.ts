import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import ListUserService from '@modules/users/services/ListUserService';
import DeleteProfileService from '@modules/users/services/DeleteProfileService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, password, email, occupation } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
      occupation,
    });

    return response.json(classToClass(user));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listUser = container.resolve(ListUserService);

    const users = await listUser.execute({ user_id });

    return response.json(classToClass(users));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUser = container.resolve(DeleteProfileService);

    const user = await deleteUser.execute({ id });

    return response.status(204).json(user);
  }
}
