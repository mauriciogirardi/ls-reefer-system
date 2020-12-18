import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Product from '../infra/typeorm/entities/Product';
import IProductRepository from '../repositories/IProductsRepository';

interface Request {
  id: string;
  name: string;
  price: number;
  quantity: number;
  date: Date;
}

@injectable()
export default class UpdateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute({
    id,
    name,
    date,
    price,
    quantity,
  }: Request): Promise<Product> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError('Product mot found.');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;
    product.date = date;

    return this.productRepository.save(product);
  }
}
