import { inject, injectable } from 'tsyringe';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  user_id: string;
}

@injectable()
export default class ListUserService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: Request): Promise<User[]> {
    const users = await this.usersRepository.findAllUsers({
      except_user_id: user_id,
    });

    return users;
  }
}
