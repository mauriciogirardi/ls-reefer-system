import { inject, injectable } from 'tsyringe';

import Expense from '../infra/typeorm/entities/Expense';
import IExpenseRepository from '../repositories/IExpenseRepository';

interface Request {
  name: string;
}

@injectable()
export default class ListExpenseService {
  constructor(
    @inject('ExpenseRepository')
    private expenseRepository: IExpenseRepository,
  ) {}

  public async execute({ name }: Request): Promise<Expense[]> {
    const expense = await this.expenseRepository.findByNameOrAllExpense(name);

    return expense;
  }
}
