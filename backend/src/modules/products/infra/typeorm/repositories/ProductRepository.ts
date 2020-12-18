import { getRepository, Like, Repository } from 'typeorm';

import IProductRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import Product from '../entities/Product';

export default class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    date,
    name,
    price,
    quantity,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      date,
      name,
      price,
      quantity,
    });

    return this.ormRepository.save(product);
  }

  public async save(product: Product): Promise<Product> {
    return this.ormRepository.save(product);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async findById(id: string): Promise<Product | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async findByNameOrAllProduct(name: string): Promise<Product[]> {
    let products: Product[];

    if (name) {
      products = await this.ormRepository.find({
        name: Like(`%${name}%`),
      });
    } else {
      products = await this.ormRepository.find({ order: { name: 'DESC' } });
    }

    return products;
  }
}
