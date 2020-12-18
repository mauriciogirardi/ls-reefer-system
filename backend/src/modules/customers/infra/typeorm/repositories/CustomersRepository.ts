import { getRepository, Like, Repository } from 'typeorm';

import ICustomerRepository from '@modules/customers/repositories/ICustomerRepository';
import ICreateCostomerDTO from '@modules/customers/dtos/ICreateCustomerDTO';
import AppError from '@shared/errors/AppError';
import Customer from '../entities/Customer';

export default class CustomersReposirory implements ICustomerRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async create({
    address,
    city,
    name,
    neighborhood,
    phone,
  }: ICreateCostomerDTO): Promise<Customer> {
    const customer = this.ormRepository.create({
      address,
      city,
      name,
      neighborhood,
      phone,
    });

    await this.ormRepository.save(customer);

    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    return this.ormRepository.save(customer);
  }

  public async findByPhone(phone: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: { phone },
    });

    return customer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne(id);

    if (!customer) {
      throw new AppError('Customer not found!');
    }

    return customer;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async findAllUsers(name: string): Promise<Customer[]> {
    let customers: Customer[];

    if (name) {
      customers = await this.ormRepository.find({
        name: Like(`%${name}%`),
      });
    } else {
      customers = await this.ormRepository.find({ order: { name: 'DESC' } });
    }

    return customers;
  }
}
