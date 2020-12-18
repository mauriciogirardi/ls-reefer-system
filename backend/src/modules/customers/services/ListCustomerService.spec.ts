import 'reflect-metadata';

import ListCustomerService from './ListCustomerService';
import FakeCreateCustomerRepository from '../repositories/fakes/FakeCreateCustomerReposytory';

let fakeCustomerRepository: FakeCreateCustomerRepository;
let listCustomer: ListCustomerService;

describe('ListCustomer', () => {
  beforeEach(() => {
    fakeCustomerRepository = new FakeCreateCustomerRepository();

    listCustomer = new ListCustomerService(fakeCustomerRepository);
  });

  it('Should be able to search a customer by name.', async () => {
    const customerOne = await fakeCustomerRepository.create({
      name: 'Jonh Doe',
      phone: '47000000000',
      address: 'Rua A, 10',
      city: 'São Francisco do Sul',
      neighborhood: 'Bairro',
    });

    const customerTwo = await fakeCustomerRepository.create({
      name: 'Jonh Doe Two',
      phone: '47000000000',
      address: 'Rua A, 10',
      city: 'São Francisco do Sul',
      neighborhood: 'Bairro',
    });

    const findNamecustomer = await listCustomer.execute({
      name: customerOne.name,
    });

    expect(findNamecustomer).toEqual([customerOne]);
    expect(findNamecustomer).not.toEqual([customerTwo]);
  });

  it('Should be able to list all customer if not pass name.', async () => {
    const customerOne = await fakeCustomerRepository.create({
      name: 'Jonh Doe',
      phone: '47000000000',
      address: 'Rua A, 10',
      city: 'São Francisco do Sul',
      neighborhood: 'Bairro',
    });

    const customerTwo = await fakeCustomerRepository.create({
      name: 'Jonh Doe Two',
      phone: '47000000000',
      address: 'Rua A, 10',
      city: 'São Francisco do Sul',
      neighborhood: 'Bairro',
    });

    const findNamecustomer = await listCustomer.execute({
      name: '',
    });

    expect(findNamecustomer).toEqual([customerOne, customerTwo]);
  });
});
