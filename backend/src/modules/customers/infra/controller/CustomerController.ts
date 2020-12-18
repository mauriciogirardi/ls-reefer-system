import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import UpdateCustomerService from '@modules/customers/services/UpdateCustomerService';
import DeleteCustomerService from '@modules/customers/services/DeleteCustomerService';
import ListCustomerService from '@modules/customers/services/ListCustomerService';

export default class CustomerController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, phone, city, neighborhood, address } = request.body;

    const createCustomer = container.resolve(CreateCustomerService);

    const customer = await createCustomer.execute({
      neighborhood,
      name,
      address,
      city,
      phone,
    });

    return response.json(customer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, phone, city, neighborhood, address } = request.body;

    const updateCustomer = container.resolve(UpdateCustomerService);

    const customer = await updateCustomer.execute({
      id,
      name,
      phone,
      city,
      neighborhood,
      address,
    });

    return response.json(customer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCustomer = container.resolve(DeleteCustomerService);

    const customer = await deleteCustomer.execute({ id });

    return response.status(204).json(customer);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { name } = request.params;

    const listCustomer = container.resolve(ListCustomerService);

    const customer = await listCustomer.execute({ name });

    return response.json(customer);
  }
}
