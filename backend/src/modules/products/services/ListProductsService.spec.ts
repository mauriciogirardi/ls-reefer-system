import 'reflect-metadata';

import ListProductService from './ListProductsService';
import FakeCreateProductRepository from '../repositories/fakes/FakeProductRepository';

let fakeCreateExpenseRepository: FakeCreateProductRepository;
let listProduct: ListProductService;

describe('ListProduct', () => {
  beforeEach(() => {
    fakeCreateExpenseRepository = new FakeCreateProductRepository();

    listProduct = new ListProductService(fakeCreateExpenseRepository);
  });

  it('Should be able to list a product search by name.', async () => {
    const product1 = await fakeCreateExpenseRepository.create({
      name: 'Product',
      date: new Date(),
      price: 120,
      quantity: 1,
    });

    const searchProduct = await listProduct.execute({ name: product1.name });

    expect(searchProduct).toEqual([product1]);
  });

  it('Should be able to list all product, when not search by name.', async () => {
    const product1 = await fakeCreateExpenseRepository.create({
      name: 'Product',
      date: new Date(),
      price: 120,
      quantity: 1,
    });

    const product2 = await fakeCreateExpenseRepository.create({
      name: 'Product Doe',
      date: new Date(),
      price: 120,
      quantity: 1,
    });

    const searchProduct = await listProduct.execute({ name: '' });

    expect(searchProduct).toEqual([product1, product2]);
  });
});
