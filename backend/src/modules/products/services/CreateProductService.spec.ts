import 'reflect-metadata';

import CreateProductService from './CreateProductService';
import FakeCreateProductRepository from '../repositories/fakes/FakeProductRepository';

let fakeCreateExpenseRepository: FakeCreateProductRepository;
let createProduct: CreateProductService;

describe('CreateExpense', () => {
  beforeEach(() => {
    fakeCreateExpenseRepository = new FakeCreateProductRepository();

    createProduct = new CreateProductService(fakeCreateExpenseRepository);
  });

  it('Should be able to create a new product.', async () => {
    const product = await createProduct.execute({
      name: 'Expense',
      date: new Date(),
      price: 120,
      quantity: 1,
    });

    expect(product).toHaveProperty('id');
  });
});
