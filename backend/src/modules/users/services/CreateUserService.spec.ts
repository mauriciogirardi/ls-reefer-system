import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import CreateUsersService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeCreateUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUsersService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUsersService(fakeUsersRepository, fakeHashProvider);
  });

  it('Should be able to create a new user.', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      occupation: 'office',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('Should be not able to create a new user with same email from another.', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      occupation: 'office',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        occupation: 'office',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
