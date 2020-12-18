import { inject, injectable } from 'tsyringe';

import Expense from '../infra/typeorm/entities/Expense';
import IExpenseRepository from '../repositories/IExpenseRepository';

interface Request {
  name: string;
  price: number;
  date: Date;
}

@injectable()
export default class CreateExpenseService {
  constructor(
    @inject('ExpenseRepository')
    private expenseRepository: IExpenseRepository,
  ) {}

  public async execute({ date, name, price }: Request): Promise<Expense> {
    const expense = await this.expenseRepository.create({
      date,
      name,
      price,
    });

    return expense;
  }
}
