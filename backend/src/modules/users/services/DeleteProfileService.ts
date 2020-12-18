import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  id: string;
}

@injectable()
export default class DeleteProfileService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id }: Request): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found.');
    }

    await this.usersRepository.delete(id);
  }
}
