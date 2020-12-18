import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Customer from '../infra/typeorm/entities/Customer';
import ICustomerRepository from '../repositories/ICustomerRepository';

interface Request {
  name: string;
  city: string;
  address: string;
  phone: string;
  neighborhood: string;
}

@injectable()
export default class CreateCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute({
    address,
    city,
    name,
    neighborhood,
    phone,
  }: Request): Promise<Customer> {
    const checkPhoneCustomerExists = await this.customerRepository.findByPhone(
      phone,
    );

    if (phone.length > 14) {
      throw new AppError(
        'The phone number need to haver just 14 number with (00)00000-0000.',
      );
    }

    if (checkPhoneCustomerExists) {
      throw new AppError('This phone already used.');
    }

    const customer = await this.customerRepository.create({
      address,
      city,
      name,
      neighborhood,
      phone,
    });

    return customer;
  }
}
