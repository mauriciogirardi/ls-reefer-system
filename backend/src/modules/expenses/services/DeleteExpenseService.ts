import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import IExpenseRepository from '../repositories/IExpenseRepository';

interface Request {
  id: string;
}

@injectable()
export default class DeleteExpenseService {
  constructor(
    @inject('ExpenseRepository')
    private expenseRepository: IExpenseRepository,
  ) {}

  public async execute({ id }: Request): Promise<void> {
    const expense = await this.expenseRepository.findById(id);

    if (!expense) {
      throw new AppError('Expense not found.');
    }

    await this.expenseRepository.delete(id);
  }
}
