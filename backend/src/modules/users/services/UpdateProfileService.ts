import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface Request {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
  occupation: string;
}

@injectable()
export default class UpdateProfileService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    email,
    occupation,
    name,
    password,
    old_password,
  }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('E-mail already in use');
    }

    user.name = name;
    user.email = email;
    user.occupation = occupation;

    if (password && !old_password) {
      throw new AppError(
        'You need inform the old password to set a new password.',
      );
    }

    if (password && old_password) {
      const ckeckOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!ckeckOldPassword) {
        throw new AppError('Old password does not match.');
      }
    }

    if (password) {
      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}
