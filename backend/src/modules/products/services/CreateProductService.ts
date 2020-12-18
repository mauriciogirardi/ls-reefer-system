import { inject, injectable } from 'tsyringe';

import Product from '../infra/typeorm/entities/Product';
import IProductRepository from '../repositories/IProductsRepository';

interface Request {
  name: string;
  price: number;
  quantity: number;
  date: Date;
}

@injectable()
export default class CreateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute({
    name,
    date,
    price,
    quantity,
  }: Request): Promise<Product> {
    const product = await this.productRepository.create({
      date,
      name,
      price,
      quantity,
    });

    return product;
  }
}
