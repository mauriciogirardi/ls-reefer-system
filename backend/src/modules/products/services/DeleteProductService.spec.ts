import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import DeleteProductService from './DeleteProductService';
import FakeCreateProductRepository from '../repositories/fakes/FakeProductRepository';

let fakeCreateExpenseRepository: FakeCreateProductRepository;
let deleteProduct: DeleteProductService;

describe('DeleteProduct', () => {
  beforeEach(() => {
    fakeCreateExpenseRepository = new FakeCreateProductRepository();

    deleteProduct = new DeleteProductService(fakeCreateExpenseRepository);
  });

  it('Should be able to delete a  product.', async () => {
    const product1 = await fakeCreateExpenseRepository.create({
      name: 'Expense',
      date: new Date(),
      price: 120,
      quantity: 1,
    });

    const delProduct = await deleteProduct.execute({ id: product1.id });

    expect(delProduct).not.toEqual([product1]);
  });

  it('Should be able to delete a  product.', async () => {
    await expect(
      deleteProduct.execute({ id: 'not-found-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
