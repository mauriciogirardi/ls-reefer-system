import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeCreateUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showPriofile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showPriofile = new ShowProfileService(fakeUsersRepository);
  });

  it('Should be able to show the profile.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      occupation: 'office',
      password: '123456',
    });

    const profile = await showPriofile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndoe@example.com');
  });

  it('Should not be able to show the profile from non-exixting-user.', async () => {
    await expect(
      showPriofile.execute({
        user_id: 'non-exixting-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
