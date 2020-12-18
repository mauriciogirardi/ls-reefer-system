import { getRepository, Not, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';
import IFindAllUsers from '@modules/users/dtos/IFindAllUsersDTO';
import User from '../entities/User';

export default class UsersRepository implements IUsersRepository {
  private ormReposritory: Repository<User>;

  constructor() {
    this.ormReposritory = getRepository(User);
  }

  public async create({
    email,
    name,
    occupation,
    password,
  }: ICreateUsersDTO): Promise<User> {
    const user = this.ormReposritory.create({
      email,
      name,
      occupation,
      password,
    });

    await this.ormReposritory.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormReposritory.save(user);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormReposritory.findOne({
      where: { email },
    });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormReposritory.findOne(id);

    return user;
  }

  public async findAllUsers({
    except_user_id,
  }: IFindAllUsers): Promise<User[]> {
    let users: User[];

    if (except_user_id) {
      users = await this.ormReposritory.find({
        where: {
          id: Not(except_user_id),
        },
      });
    } else {
      users = await this.ormReposritory.find();
    }

    return users;
  }

  public async delete(id: string): Promise<void> {
    await this.ormReposritory.delete(id);
  }
}
