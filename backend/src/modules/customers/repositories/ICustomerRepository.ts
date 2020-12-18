import ICreateCustomerDTO from '../dtos/ICreateCustomerDTO';
import Customer from '../infra/typeorm/entities/Customer';

export default interface ICustomerRepository {
  findById(id: string): Promise<Customer | undefined>;
  findByPhone(phone: string): Promise<Customer | undefined>;
  create(data: ICreateCustomerDTO): Promise<Customer>;
  delete(id: string): Promise<void>;
  save(customer: Customer): Promise<Customer>;
  findAllUsers(name: string): Promise<Customer[]>;
}
