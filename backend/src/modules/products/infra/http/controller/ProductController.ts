import { Response, Request } from 'express';
import { container } from 'tsyringe';

import CreateProductService from '@modules/products/services/CreateProductService';
import ListProductsService from '@modules/products/services/ListProductsService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import DeleteProductsService from '@modules/products/services/DeleteProductService';
import { parseISO } from 'date-fns';

export default class ProductController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { date, name, price, quantity } = request.body;

    const createProduct = container.resolve(CreateProductService);

    const formattedDate = parseISO(date);

    const product = await createProduct.execute({
      date: formattedDate,
      name,
      price,
      quantity,
    });

    return response.json(product);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { name } = request.params;

    const listProduct = container.resolve(ListProductsService);

    const product = await listProduct.execute({ name });

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { date, name, price, quantity } = request.body;

    const updateProduct = container.resolve(UpdateProductService);

    const formattedDate = parseISO(date);

    const product = await updateProduct.execute({
      id,
      date: formattedDate,
      name,
      price,
      quantity,
    });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProduct = container.resolve(DeleteProductsService);

    const product = await deleteProduct.execute({ id });

    return response.status(204).json(product);
  }
}
