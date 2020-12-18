import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import UpdateProfileService from './UpdateProfileService';
import FakeUsersRepository from '../repositories/fakes/FakeCreateUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileAvatar: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileAvatar = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to upload the profile.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      occupation: 'office',
      password: '123456',
    });

    const updateUser = await updateProfileAvatar.execute({
      user_id: user.id,
      name: 'John Ka',
      email: 'johnka@example.com',
      occupation: 'office2',
      old_password: '123456',
      password: '123456',
    });

    expect(updateUser.name).toBe('John Ka');
    expect(updateUser.email).toBe('johnka@example.com');
    expect(updateUser.occupation).toBe('office2');
  });

  it('Should not be able to change to onother user email.', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      occupation: 'office',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'John Doe2',
      email: 'johndoe2@example.com',
      occupation: 'office2',
      password: '123456',
    });

    await expect(
      updateProfileAvatar.execute({
        user_id: user.id,
        name: 'John Ka',
        email: 'johndoe@example.com',
        occupation: 'office2',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to upload the password.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      occupation: 'office',
      password: '123456',
    });

    const updateUser = await updateProfileAvatar.execute({
      user_id: user.id,
      name: 'John Doe',
      email: 'johndoe@example.com',
      occupation: 'office',
      old_password: '123456',
      password: '123123',
    });

    expect(updateUser.password).toBe('123123');
  });

  it('Should not be able to update the profile from non-exixting-user.', async () => {
    await expect(
      updateProfileAvatar.execute({
        user_id: 'non-exixting-user',
        name: 'John Doe',
        email: 'johndoe@example.com',
        occupation: 'office',
        old_password: '123456',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to upload the  new password without wrong old password.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      occupation: 'office',
      password: '123456',
    });

    await expect(
      updateProfileAvatar.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'johndoe@example.com',
        occupation: 'office',
        old_password: 'wrong-password',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to upload the  password without  old password.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      occupation: 'office',
      password: '123456',
    });

    await expect(
      updateProfileAvatar.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'johndoe@example.com',
        occupation: 'office',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
