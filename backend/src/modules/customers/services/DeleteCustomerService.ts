import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICustomerRepository from '../repositories/ICustomerRepository';

interface Request {
  id: string;
}

@injectable()
export default class DeleteCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute({ id }: Request): Promise<void> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    await this.customerRepository.delete(id);
  }
}
