import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { Authmodule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { loggerGlobal } from './middlewares/logger.middleware';
import { CategoriesModule } from './modules/categories/categories.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUploasModule } from './modules/file-upload/file-uploas.module';
import { JwtModule } from '@nestjs/jwt';
import { ApiExtraModels } from '@nestjs/swagger';
import { Users } from './modules/users/entities/user.entity';
import { Products } from './modules/products/entities/products.entity';
import { Orders } from './modules/orders/entities/order.entity';
import { Categories } from './modules/categories/entities/category.entity';

@ApiExtraModels(Users, Products, Orders, Categories)
@Module({
  imports: [
    UsersModule,
    Authmodule,
    ProductsModule,
    CategoriesModule,
    OrdersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('typeorm')!,
    }),
    FileUploasModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '60m',
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(loggerGlobal).forRoutes('*');
  }
}
