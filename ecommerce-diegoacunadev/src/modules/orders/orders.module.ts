import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Orders } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/entities/user.entity';
import { OrderDetails } from './entities/orderDetails.entity';
import { Products } from '../products/entities/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, Users, OrderDetails, Products])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
