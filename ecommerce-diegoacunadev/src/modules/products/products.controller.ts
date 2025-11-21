import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product-dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { AuthGuard } from '../../guards/auth.guards';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/guards/roles.enum';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('seeder')
  seeder() {
    return this.productsService.seeder();
  }

  @Get()
  async findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    const pageNumber = page ? parseInt(page, 10) : 1;
    const limitNumber = limit ? parseInt(limit, 10) : 5;

    return this.productsService.findAll(pageNumber, limitNumber);
  }

  @Get(':id')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard) //guardian
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const product = await this.productsService.findOne(id);

    if (!product) {
      return {
        statusCode: 404,
        message: 'Producto no encontrado',
      };
    }

    return {
      statusCode: 200,
      message: 'Producto encontrado con éxito',
      producto: product,
    };
  }

  @Post('create')
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const product = await this.productsService.createProduct(createProductDto);
    return {
      statusCode: 201,
      message: 'Producto creado con éxito',
      producto: product,
    };
  }

  @Put('update/:id')
  async updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const updatedProduct = await this.productsService.updateProduct(
      id,
      updateProductDto,
    );

    if (!updatedProduct) {
      return {
        statusCode: 404,
        message: 'Producto no encontrado',
      };
    }

    return {
      statusCode: 200,
      message: 'Producto actualizado con éxito',
      producto: updatedProduct,
    };
  }

  @Delete('delete/:id')
  async deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
    const deleteProduct = await this.productsService.deleteProduct(id);

    if (!deleteProduct) {
      return {
        statusCode: 404,
        message: 'Producto no encontrado',
      };
    }

    return {
      statusCode: 200,
      message: 'Producto eliminado con éxito',
      datosDeUsuario: deleteProduct,
    };
  }
}
