import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import UpdateCustomerService from './UpdateCustomerService';
import FakeCreateCustomerRepository from '../repositories/fakes/FakeCreateCustomerReposytory';

let fakeCustomerRepository: FakeCreateCustomerRepository;
let UpdateCustomer: UpdateCustomerService;

describe('UpdateCustomer', () => {
  beforeEach(() => {
    fakeCustomerRepository = new FakeCreateCustomerRepository();

    UpdateCustomer = new UpdateCustomerService(fakeCustomerRepository);
  });

  it('Should be able to update customer.', async () => {
    const customerOne = await fakeCustomerRepository.create({
      name: 'Jonh Doe',
      phone: '47000000000',
      address: 'Rua A, 10',
      city: 'São Francisco do Sul',
      neighborhood: 'Bairro',
    });

    const updateCustomer = await UpdateCustomer.execute({
      id: customerOne.id,
      name: 'Jonh For',
      phone: '47000000000',
      address: 'Rua A, 10635',
      city: 'São Francisco do Sul',
      neighborhood: 'Bairro',
    });

    expect(updateCustomer.name).toBe('Jonh For');
    expect(updateCustomer.phone).toBe('47000000000');
  });

  it('Should  not be able to update customer.', async () => {
    expect(
      UpdateCustomer.execute({
        id: 'id-not-found',
        name: 'Jonh For',
        phone: '47000000010',
        address: 'Rua A, 10635',
        city: 'São Francisco do Sul',
        neighborhood: 'Bairro',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
