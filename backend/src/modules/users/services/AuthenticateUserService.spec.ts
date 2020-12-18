import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import AuthenticateUserService from './AuthenticateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeCreateUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;
let createUser: CreateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('Should be able authenticate.', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      occupation: 'office',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('Should not be able authenticate with wrong password.', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      occupation: 'office',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'johndoe@example.com',
        password: 'password-wrong',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able authenticate with non existing user.', async () => {
    await expect(
      authenticateUser.execute({
        email: 'non-existing-user',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
