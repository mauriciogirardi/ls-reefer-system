import { inject, injectable } from 'tsyringe';

import Product from '../infra/typeorm/entities/Product';
import IProductRepository from '../repositories/IProductsRepository';

interface Request {
  name: string;
}

@injectable()
export default class ListProductsService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute({ name }: Request): Promise<Product[]> {
    const product = await this.productRepository.findByNameOrAllProduct(name);

    return product;
  }
}
