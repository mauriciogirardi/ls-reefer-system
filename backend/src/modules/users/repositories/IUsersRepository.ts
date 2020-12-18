import ICreateUsersDTO from '../dtos/ICreateUsersDTO';
import IFindAllUsers from '../dtos/IFindAllUsersDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
  findAllUsers({ except_user_id }: IFindAllUsers): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  create(data: ICreateUsersDTO): Promise<User>;
  delete(id: string): Promise<void>;
  save(user: User): Promise<User>;
}
