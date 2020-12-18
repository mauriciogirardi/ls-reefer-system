import { v4 } from 'uuid';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';
import IFindAllUsers from '@modules/users/dtos/IFindAllUsersDTO';
import User from '../../infra/typeorm/entities/User';

export default class FakeCreateUsersRepoository implements IUsersRepository {
  private users: User[] = [];

  public async create({
    email,
    name,
    occupation,
    password,
  }: ICreateUsersDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: v4(),
      email,
      name,
      occupation,
      password,
    });

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);
    return findUser;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);
    return findUser;
  }

  public async findAllUsers({
    except_user_id,
  }: IFindAllUsers): Promise<User[]> {
    let { users } = this;

    if (except_user_id) {
      users = this.users.filter(user => user.id !== except_user_id);
    }

    return users;
  }

  public async delete(id: string): Promise<void> {
    const findUser = this.users.findIndex(user => user.id === id);

    this.users.splice(findUser, 1);
  }
}
