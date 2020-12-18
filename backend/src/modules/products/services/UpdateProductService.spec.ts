import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import UpdateProductService from './UpdateProductService';
import FakeCreateProductRepository from '../repositories/fakes/FakeProductRepository';

let fakeCreateExpenseRepository: FakeCreateProductRepository;
let updateProduct: UpdateProductService;

describe('UpdateProduct', () => {
  beforeEach(() => {
    fakeCreateExpenseRepository = new FakeCreateProductRepository();

    updateProduct = new UpdateProductService(fakeCreateExpenseRepository);
  });

  it('Should be able to update a product.', async () => {
    const product = await fakeCreateExpenseRepository.create({
      name: 'Product',
      date: new Date(),
      price: 120,
      quantity: 1,
    });

    const update = await updateProduct.execute({
      id: product.id,
      name: 'Doe',
      date: new Date(),
      price: 100,
      quantity: 12,
    });

    expect(update.name).toBe('Doe');
    expect(update.price).toBe(100);
    expect(update.quantity).toBe(12);
  });

  it('Should be able to update a product.', async () => {
    await expect(
      updateProduct.execute({
        id: 'not-found-id',
        name: 'Doe',
        date: new Date(),
        price: 100,
        quantity: 12,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
