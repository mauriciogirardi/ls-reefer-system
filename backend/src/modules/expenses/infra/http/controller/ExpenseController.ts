import { Response, Request } from 'express';
import { container } from 'tsyringe';

import CreateExpenseService from '@modules/expenses/services/CreateExpenseService';
import ListExpenseService from '@modules/expenses/services/ListExpenseService';
import UpdateExpenseService from '@modules/expenses/services/UpdateExpenseService';
import DeleteExpenseService from '@modules/expenses/services/DeleteExpenseService';
import { parseISO } from 'date-fns';

export default class ExpenseController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, date } = request.body;

    const createExpense = container.resolve(CreateExpenseService);

    const formattedDate = parseISO(date);

    const expense = await createExpense.execute({
      date: formattedDate,
      name,
      price,
    });

    return response.json(expense);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { name } = request.params;
    const listExpense = container.resolve(ListExpenseService);

    const expense = await listExpense.execute({ name });

    return response.json(expense);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, price, date } = request.body;

    const updateExpense = container.resolve(UpdateExpenseService);

    const formattedDate = parseISO(date);

    const expense = await updateExpense.execute({
      date: formattedDate,
      id,
      name,
      price,
    });

    return response.json(expense);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const updateExpense = container.resolve(DeleteExpenseService);

    const expense = await updateExpense.execute({ id });

    return response.status(204).json(expense);
  }
}
