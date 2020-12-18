import { inject, injectable } from 'tsyringe';

import ICustomerRepository from '../repositories/ICustomerRepository';
import Customer from '../infra/typeorm/entities/Customer';

interface Request {
  name: string;
}

@injectable()
export default class ListCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute({ name }: Request): Promise<Customer[]> {
    const customer = await this.customerRepository.findAllUsers(name);

    return customer;
  }
}
