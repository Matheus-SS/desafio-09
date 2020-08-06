import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) { }

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const checkCustomerExists = await this.customersRepository.findById(
      customer_id,
    );

    if (!checkCustomerExists) {
      throw new AppError('Customer does not exists');
    }

    const arrayOfProductIds = products.map(product => ({
      id: product.id,
    }));

    const arrayOfFoundProducts = await this.productsRepository.findAllById(
      arrayOfProductIds,
    );

    const arrayOfFoundProductsId = arrayOfFoundProducts.map(product => ({
      id: product.id,
    }));

    // this will return a array with products thats does NOT exists
    const productsNotExists = arrayOfProductIds.filter(
      productId =>
        !arrayOfFoundProductsId.find(
          foundProductId => productId.id === foundProductId.id,
        ),
    );

    if (productsNotExists.length !== 0) {
      throw new AppError(
        `These products do not exist: ${productsNotExists.map(
          prod => prod.id,
        )}`,
      );
    }

    products.forEach(product => {
      const quantityInDatabase = arrayOfFoundProducts.find(
        ({ id }) => id === product.id,
      )?.quantity;

      if ((quantityInDatabase || 0) < product.quantity) {
        throw new AppError('Quantity out of stock');
      }
    });

    const order = await this.ordersRepository.create({
      customer: checkCustomerExists,
      products: products.map(product => ({
        product_id: product.id,
        quantity: product.quantity,
        price:
          arrayOfFoundProducts.find(({ id }) => id === product.id)?.price || 0,
      })),
    });

    await this.productsRepository.updateQuantity(products);

    return order;
  }
}

export default CreateOrderService;
