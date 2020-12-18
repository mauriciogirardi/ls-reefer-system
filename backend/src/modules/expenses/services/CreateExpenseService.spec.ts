import 'reflect-metadata';

import CreateExpenseService from './CreateExpenseService';
import FakeCreateExpenseRepository from '../repositories/fakes/FakeCreateExpenseRepository';

let fakeCreateExpenseRepository: FakeCreateExpenseRepository;
let createExpense: CreateExpenseService;

describe('CreateExpense', () => {
  beforeEach(() => {
    fakeCreateExpenseRepository = new FakeCreateExpenseRepository();

    createExpense = new CreateExpenseService(fakeCreateExpenseRepository);
  });

  it('Should be able to create a new expense.', async () => {
    const expense = await createExpense.execute({
      name: 'Expense',
      date: new Date(),
      price: 120,
    });

    expect(expense).toHaveProperty('id');
  });
});
