import { v4 } from 'uuid';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import ICreateCustomerDTO from '@modules/customers/dtos/ICreateCustomerDTO';
import ICustomerRepository from '@modules/customers/repositories/ICustomerRepository';

export default class FakeCreateCustomerRepoository
  implements ICustomerRepository {
  private customers: Customer[] = [];

  public async create({
    name,
    address,
    city,
    neighborhood,
    phone,
  }: ICreateCustomerDTO): Promise<Customer> {
    const customer = new Customer();

    Object.assign(customer, {
      id: v4(),
      name,
      address,
      city,
      neighborhood,
      phone,
    });

    this.customers.push(customer);

    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    const findIndex = this.customers.findIndex(
      findCustomer => findCustomer.id === customer.id,
    );

    this.customers[findIndex] = customer;

    return customer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const findCustomer = this.customers.find(customer => customer.id === id);
    return findCustomer;
  }

  public async findAllUsers(name: string): Promise<Customer[]> {
    let customers: Customer[];

    if (name) {
      customers = this.customers.filter(customer => customer.name === name);
    } else {
      customers = this.customers.map(customer => customer);
    }

    return customers;
  }

  public async findByPhone(phone: string): Promise<Customer | undefined> {
    const findCustomer = this.customers.find(
      customer => customer.phone === phone,
    );

    return findCustomer;
  }

  public async delete(id: string): Promise<void> {
    const findCustomer = this.customers.findIndex(
      customer => customer.id === id,
    );

    this.customers.splice(findCustomer, 1);
  }
}
