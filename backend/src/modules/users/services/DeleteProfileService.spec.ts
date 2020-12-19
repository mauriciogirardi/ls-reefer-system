import AppError from '@shared/errors/AppError';
import 'reflect-metadata';

import FakeUsersRepository from '../repositories/fakes/FakeCreateUsersRepository';
import DeleteProfileService from './DeleteProfileService';

let fakeUsersRepository: FakeUsersRepository;
let deleteUser: DeleteProfileService;

describe('DeleteUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    deleteUser = new DeleteProfileService(fakeUsersRepository);
  });

  it('Should be able to delete s user.', async () => {
    const user = await fakeUsersRepository.create({
      email: 'john@test.com',
      name: 'john Doe',
      occupation: 'not',
      password: '123456',
    });

    const delUser = await deleteUser.execute({ id: user.id });

    expect(delUser).not.toEqual([user]);
  });

  it('Should be not able to delete a user.', async () => {
    await expect(
      deleteUser.execute({ id: 'not-found-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
