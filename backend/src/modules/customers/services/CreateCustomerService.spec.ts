import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import CreateCustomerService from './CreateCustomerService';
import FakeCreateCustomerRepository from '../repositories/fakes/FakeCreateCustomerReposytory';

let fakeCustomerRepository: FakeCreateCustomerRepository;
let createCustomer: CreateCustomerService;

describe('CreateCostumer', () => {
  beforeEach(() => {
    fakeCustomerRepository = new FakeCreateCustomerRepository();

    createCustomer = new CreateCustomerService(fakeCustomerRepository);
  });

  it('Should be able to create a new customer.', async () => {
    const customer = await createCustomer.execute({
      name: 'John Doe',
      phone: '(47)00000-0000',
      address: 'Rua A, 10',
      city: 'São Francisco do Sul',
      neighborhood: 'Bairro',
    });

    expect(customer).toHaveProperty('id');
  });

  it('Should be able to create a phone with 14 number.', async () => {
    const customer = await createCustomer.execute({
      name: 'John Doe',
      phone: '(47)00000-0000',
      address: 'Rua A, 10',
      city: 'São Francisco do Sul',
      neighborhood: 'Bairro',
    });

    expect(customer.phone.length).toBe(14);
  });

  it('Should be not able to create a phone with more 14 number.', async () => {
    await expect(
      createCustomer.execute({
        name: 'John Doe',
        phone: '(47)00000-00000',
        address: 'Rua A, 10',
        city: 'São Francisco do Sul',
        neighborhood: 'Bairro',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be not able to create a phone with same  number other customer.', async () => {
    await createCustomer.execute({
      name: 'John Doe',
      phone: '(47)00000-0001',
      address: 'Rua A, 10',
      city: 'São Francisco do Sul',
      neighborhood: 'Bairro',
    });

    await expect(
      createCustomer.execute({
        name: 'John Doe',
        phone: '(47)00000-0001',
        address: 'Rua A, 10',
        city: 'São Francisco do Sul',
        neighborhood: 'Bairro',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
