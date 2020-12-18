import { v4 } from 'uuid';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import Product from '../../infra/typeorm/entities/Product';
import IProductRepository from '../IProductsRepository';

export default class FakeProductRepository implements IProductRepository {
  private products: Product[] = [];

  public async create({
    date,
    quantity,
    price,
    name,
  }: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    Object.assign(product, {
      id: v4(),
      date,
      quantity,
      price,
      name,
    });

    this.products.push(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    const findIndex = this.products.findIndex(
      findProduct => findProduct.id === product.id,
    );

    this.products[findIndex] = product;

    return product;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const findProduct = this.products.find(product => product.id === id);
    return findProduct;
  }

  public async findByNameOrAllProduct(name: string): Promise<Product[]> {
    let products: Product[];

    if (name) {
      products = this.products.filter(product => product.name === name);
    } else {
      products = this.products.map(product => product);
    }

    return products;
  }

  public async delete(id: string): Promise<void> {
    const findProduct = this.products.findIndex(product => product.id === id);

    this.products.splice(findProduct, 1);
  }
}
