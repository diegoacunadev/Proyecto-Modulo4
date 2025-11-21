import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
// import { UpdateOrderDto } from './dto/update-order.dto';
import { Orders } from './entities/order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../users/entities/user.entity';
import { Products } from '../products/entities/products.entity';
import { OrderDetails } from './entities/orderDetails.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
    @InjectRepository(OrderDetails)
    private readonly orderDetailsRepository: Repository<OrderDetails>,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const user: Users | null = await this.usersRepository.findOneBy({
      id: createOrderDto.userId,
    });
    if (!user) return 'Error';

    const order = new Orders();
    order.date = new Date();
    order.user = user;

    const newOrder: Orders = await this.ordersRepository.save(order);

    let total = 0;
    const productsArray: Products[] = await Promise.all(
      createOrderDto.products.map(async (element) => {
        const product: Products | null =
          await this.productsRepository.findOneBy({
            id: element?.id,
          });
        if (!product) throw new Error();

        total += Number(product.price);

        await this.productsRepository.update(
          { id: product.id },
          { stock: product.stock - 1 },
        );

        return product;
      }),
    );

    const orderDetail = new OrderDetails();
    orderDetail.price = Number(total.toFixed(2));
    orderDetail.products = productsArray;
    orderDetail.order = newOrder;

    await this.orderDetailsRepository.save(orderDetail);

    return await this.ordersRepository.find({
      where: { id: newOrder.id },
      relations: { orderDetails: true },
    });
  }

  async findOne(id: string) {
    const order: Orders | null = await this.ordersRepository.findOne({
      where: { id },
      relations: {
        orderDetails: {
          products: true,
        },
      },
    });

    if (!order) {
      return 'Algo salio mal';
    }
    return order;
  }
}
