import 'reflect-metadata';

import ListExpenseService from './ListExpenseService';
import FakeCreateExpenseRepository from '../repositories/fakes/FakeCreateExpenseRepository';

let fakeCreateExpenseRepository: FakeCreateExpenseRepository;
let listExpense: ListExpenseService;

describe('ListExpense', () => {
  beforeEach(() => {
    fakeCreateExpenseRepository = new FakeCreateExpenseRepository();

    listExpense = new ListExpenseService(fakeCreateExpenseRepository);
  });

  it('Should be able to list a expense by name.', async () => {
    const expenseOne = await fakeCreateExpenseRepository.create({
      name: 'Expense',
      date: new Date(),
      price: 120,
    });

    const expenseTwo = await fakeCreateExpenseRepository.create({
      name: 'Expense',
      date: new Date(),
      price: 120,
    });

    const expenses = await listExpense.execute({ name: expenseOne.name });

    expect(expenses).toEqual([expenseOne, expenseTwo]);
  });

  it('Should be able to list all expense if not pass name.', async () => {
    const expenseOne = await fakeCreateExpenseRepository.create({
      name: 'Expense',
      date: new Date(),
      price: 120,
    });

    const expenseTwo = await fakeCreateExpenseRepository.create({
      name: 'Expense',
      date: new Date(),
      price: 120,
    });

    const expenses = await listExpense.execute({ name: '' });

    expect(expenses).toEqual([expenseOne, expenseTwo]);
  });
});
