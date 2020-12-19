import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import DeleteCustomerService from './DeleteCustomerService';
import FakeCreateCustomerRepository from '../repositories/fakes/FakeCreateCustomerReposytory';

let fakeCustomerRepository: FakeCreateCustomerRepository;
let deleteCustomer: DeleteCustomerService;

describe('DeleteCostumer', () => {
  beforeEach(() => {
    fakeCustomerRepository = new FakeCreateCustomerRepository();

    deleteCustomer = new DeleteCustomerService(fakeCustomerRepository);
  });

  it('Should be able to delete a customer.', async () => {
    const customer = await fakeCustomerRepository.create({
      name: 'John Doe One',
      phone: '47000000000',
      address: 'Rua A, 10',
      city: 'São Francisco do Sul',
      neighborhood: 'Bairro',
    });

    const delCustomer = await deleteCustomer.execute({
      id: customer.id,
    });

    expect(delCustomer).not.toEqual(customer);
  });

  it('Should not be able to found a customer.', async () => {
    await expect(
      deleteCustomer.execute({
        id: 'id-use-not-found',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
