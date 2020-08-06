import { getRepository, Repository, In } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';
import AppError from '@shared/errors/AppError';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      name,
      price,
      quantity,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const findProduct = await this.ormRepository.findOne({
      where: { name },
    });

    return findProduct;
  }

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    const arrayOfProductsId = products.map(product => product.id);

    const findProducts = this.ormRepository.find({
      where: {
        id: In(arrayOfProductsId),
      },
    });

    return findProducts;
  }

  public async updateQuantity(
    products: IUpdateProductsQuantityDTO[],
  ): Promise<Product[]> {
    const arrayOfProductsId = products.map(product => ({
      id: product.id,
    }));

    const arrayOfProducts = await this.findAllById(arrayOfProductsId);

    const findQuantity = (product: Product): number =>
      products.find(({ id }) => id === product.id)?.quantity || 0;

    const arrayOfProductsUpdated = arrayOfProducts.map(product => ({
      ...product,
      quantity: product.quantity - findQuantity(product),
    }));

    await this.ormRepository.save(arrayOfProductsUpdated);

    return arrayOfProductsUpdated;
  }
}

export default ProductsRepository;
