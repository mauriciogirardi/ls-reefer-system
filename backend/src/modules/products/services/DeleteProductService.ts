import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import IProductRepository from '../repositories/IProductsRepository';

interface Request {
  id: string;
}

@injectable()
export default class DeleteProductsService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute({ id }: Request): Promise<void> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    await this.productRepository.delete(id);
  }
}
