import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Customer from '../infra/typeorm/entities/Customer';
import ICustomerRepository from '../repositories/ICustomerRepository';

interface Request {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  neighborhood: string;
}

@injectable()
export default class UpdateCostomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute({
    id,
    address,
    city,
    name,
    neighborhood,
    phone,
  }: Request): Promise<Customer> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    customer.address = address;
    customer.city = city;
    customer.name = name;
    customer.neighborhood = neighborhood;
    customer.phone = phone;

    return this.customerRepository.save(customer);
  }
}
