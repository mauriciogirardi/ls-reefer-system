import 'reflect-metadata';

import FakeUsersRepository from '../repositories/fakes/FakeCreateUsersRepository';
import ListUsersService from './ListUserService';

let fakeUsersRepository: FakeUsersRepository;
let listUsers: ListUsersService;

describe('ListUsers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listUsers = new ListUsersService(fakeUsersRepository);
  });

  it('Should be able to list the users.', async () => {
    const userOne = await fakeUsersRepository.create({
      name: 'John Doe One',
      email: 'johndoeone@example.com',
      occupation: 'office',
      password: '123456',
    });

    const userTwo = await fakeUsersRepository.create({
      name: 'John Doe Two',
      email: 'johndoetwo@example.com',
      occupation: 'office',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Doe Four',
      email: 'johndoefour@example.com',
      occupation: 'office',
      password: '123456',
    });

    const users = await listUsers.execute({
      user_id: loggedUser.id,
    });

    expect(users).toEqual([userOne, userTwo]);
  });
});
