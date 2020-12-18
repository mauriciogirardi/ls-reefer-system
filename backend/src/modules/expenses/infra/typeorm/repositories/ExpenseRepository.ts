import { getRepository, Like, Repository } from 'typeorm';

import ICreateExpenseDTO from '@modules/expenses/dtos/ICreateExpenseDTO';
import Expense from '@modules/expenses/infra/typeorm/entities/Expense';
import IExpenseRepository from '@modules/expenses/repositories/IExpenseRepository';

export default class ExpenseRepository implements IExpenseRepository {
  private ormRepository: Repository<Expense>;

  constructor() {
    this.ormRepository = getRepository(Expense);
  }

  public async create({
    date,
    name,
    price,
  }: ICreateExpenseDTO): Promise<Expense> {
    const expense = this.ormRepository.create({
      date,
      name,
      price,
    });

    await this.ormRepository.save(expense);

    return expense;
  }

  public async save(expense: Expense): Promise<Expense> {
    return this.ormRepository.save(expense);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async findByNameOrAllExpense(name: string): Promise<Expense[]> {
    let expenses: Expense[];

    if (name) {
      expenses = await this.ormRepository.find({
        name: Like(`%${name}%`),
      });
    } else {
      expenses = await this.ormRepository.find({ order: { name: 'DESC' } });
    }

    return expenses;
  }

  public async findById(id: string): Promise<Expense | undefined> {
    const expense = await this.ormRepository.findOne(id);
    return expense;
  }
}
