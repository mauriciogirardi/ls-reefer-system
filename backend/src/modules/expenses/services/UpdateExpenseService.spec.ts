import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import UpdateExpenseService from './UpdateExpenseService';
import FakeCreateExpenseRepository from '../repositories/fakes/FakeCreateExpenseRepository';

let fakeCreateExpenseRepository: FakeCreateExpenseRepository;
let updateExpense: UpdateExpenseService;

describe('UpdateExpense', () => {
  beforeEach(() => {
    fakeCreateExpenseRepository = new FakeCreateExpenseRepository();

    updateExpense = new UpdateExpenseService(fakeCreateExpenseRepository);
  });

  it('Should be able update expense.', async () => {
    const expense = await fakeCreateExpenseRepository.create({
      name: 'Expense56',
      date: new Date(),
      price: 120,
    });

    const upExpense = await updateExpense.execute({
      id: expense.id,
      name: 'Expense',
      date: new Date(),
      price: 180,
    });

    expect(upExpense.name).toBe('Expense');
    expect(upExpense.price).toBe(180);
  });

  it('Should not be able update.', async () => {
    expect(
      updateExpense.execute({
        id: 'id-not-found',
        name: 'Expense',
        date: new Date(),
        price: 180,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
