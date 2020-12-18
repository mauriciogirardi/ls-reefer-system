import { v4 } from 'uuid';

import ICreateExpenseDTO from '@modules/expenses/dtos/ICreateExpenseDTO';
import Expense from '@modules/expenses/infra/typeorm/entities/Expense';
import IExpenseRepository from '../IExpenseRepository';

export default class FakeCreateExpenseRepository implements IExpenseRepository {
  private expenses: Expense[] = [];

  public async create({
    date,
    name,
    price,
  }: ICreateExpenseDTO): Promise<Expense> {
    const expense = new Expense();

    Object.assign(expense, {
      id: v4(),
      date,
      name,
      price,
    });

    this.expenses.push(expense);

    return expense;
  }

  public async save(expense: Expense): Promise<Expense> {
    const findIndex = this.expenses.findIndex(
      findExpense => findExpense.id === expense.id,
    );

    this.expenses[findIndex] = expense;

    return expense;
  }

  public async findById(id: string): Promise<Expense | undefined> {
    const findExpense = this.expenses.find(expense => expense.id === id);
    return findExpense;
  }

  public async findByNameOrAllExpense(name: string): Promise<Expense[]> {
    let expenses: Expense[];

    if (name) {
      expenses = this.expenses.filter(expense => expense.name === name);
    } else {
      expenses = this.expenses.map(expense => expense);
    }

    return expenses;
  }

  public async delete(id: string): Promise<void> {
    const findExpense = this.expenses.findIndex(expense => expense.id === id);

    this.expenses.splice(findExpense, 1);
  }
}
