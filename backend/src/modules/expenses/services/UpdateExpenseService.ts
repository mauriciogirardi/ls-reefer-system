import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import Expense from '../infra/typeorm/entities/Expense';
import IExpenseRepository from '../repositories/IExpenseRepository';

interface Request {
  id: string;
  name: string;
  date: Date;
  price: number;
}

@injectable()
export default class UpdateExpenseService {
  constructor(
    @inject('ExpenseRepository')
    private expenseRepository: IExpenseRepository,
  ) {}

  public async execute({ date, price, id, name }: Request): Promise<Expense> {
    const expense = await this.expenseRepository.findById(id);

    if (!expense) {
      throw new AppError('Expense mot found.');
    }

    expense.date = date;
    expense.name = name;
    expense.price = price;

    return this.expenseRepository.save(expense);
  }
}
