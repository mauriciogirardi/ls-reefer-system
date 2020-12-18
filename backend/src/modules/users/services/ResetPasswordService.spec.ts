import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import ResetPasswordService from './ResetPasswordService';
import FakeUsersRepository from '../repositories/fakes/FakeCreateUsersRepository';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let fakeHashProvider: FakeHashProvider;
let resetPasswordService: ResetPasswordService;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokenRepository = new FakeUserTokenRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokenRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to recover the password using the email.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      occupation: 'office',
      password: '123456',
    });

    const { token } = await fakeUserTokenRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPasswordService.execute({
      password: '123123',
      token,
    });

    const updateUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updateUser?.password).toBe('123123');
  });

  it('Should not be able to reset the password with non-existing token.', async () => {
    await expect(
      resetPasswordService.execute({
        password: '123123',
        token: 'non-existing-token',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to reset the password with non-existing user.', async () => {
    const { token } = await fakeUserTokenRepository.generate(
      'non-exixting-user',
    );

    await expect(
      resetPasswordService.execute({
        password: '123123',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to reset the password if passed more than two hours.', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      occupation: 'office',
      password: '123456',
    });

    const { token } = await fakeUserTokenRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        password: '123123',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
