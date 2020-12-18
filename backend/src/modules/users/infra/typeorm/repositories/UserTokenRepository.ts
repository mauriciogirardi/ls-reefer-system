import { getRepository, Repository } from 'typeorm';

import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import UserToken from '../entities/UserToken';

export default class UserTokenRepository implements IUserTokenRepository {
  private ormReposritory: Repository<UserToken>;

  constructor() {
    this.ormReposritory = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormReposritory.findOne({ where: { token } });
    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userTonken = this.ormReposritory.create({
      user_id,
    });

    await this.ormReposritory.save(userTonken);

    return userTonken;
  }
}
