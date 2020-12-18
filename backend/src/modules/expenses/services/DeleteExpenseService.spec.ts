import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import DeleteExpenseService from './DeleteExpenseService';
import FakeCreateExpenseRepository from '../repositories/fakes/FakeCreateExpenseRepository';

let fakeCreateExpenseRepository: FakeCreateExpenseRepository;
let deleteExpense: DeleteExpenseService;

describe('DeleteExpense', () => {
  beforeEach(() => {
    fakeCreateExpenseRepository = new FakeCreateExpenseRepository();

    deleteExpense = new DeleteExpenseService(fakeCreateExpenseRepository);
  });

  it('Should be able to delete a expense.', async () => {
    const expense = await fakeCreateExpenseRepository.create({
      name: 'Expense',
      date: new Date(),
      price: 120,
    });

    const delExpense = await deleteExpense.execute({ id: expense.id });

    expect(delExpense).not.toEqual(expense);
  });

  it('Should not be able not found expense.', async () => {
    await expect(
      deleteExpense.execute({ id: 'expense-not-found' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
