import Expense from '@modules/expenses/infra/typeorm/entities/Expense';
import ICreateExpenseDTO from '../dtos/ICreateExpenseDTO';

export default interface IExpenseRepository {
  findById(id: string): Promise<Expense | undefined>;
  create(data: ICreateExpenseDTO): Promise<Expense>;
  delete(id: string): Promise<void>;
  save(costomer: Expense): Promise<Expense>;
  findByNameOrAllExpense(name: string): Promise<Expense[]>;
}
