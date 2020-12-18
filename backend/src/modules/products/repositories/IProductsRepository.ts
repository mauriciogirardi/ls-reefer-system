import ICreateProductDTO from '../dtos/ICreateProductDTO';
import Product from '../infra/typeorm/entities/Product';

export default interface IProductRepository {
  create(date: ICreateProductDTO): Promise<Product>;
  save(product: Product): Promise<Product>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Product | undefined>;
  findByNameOrAllProduct(name: string): Promise<Product[]>;
}
