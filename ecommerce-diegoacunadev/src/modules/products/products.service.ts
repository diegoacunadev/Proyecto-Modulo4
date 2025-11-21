import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities/products.entity';
import data from '../../data.json';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product-dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Categories } from '../categories/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async seeder() {
    const categories: Categories[] = await this.categoriesRepository.find();

    const newProducts: Products[] = data.map((product) => {
      const category: Categories | undefined = categories.find(
        (category) => product.category === category.name,
      );

      const newProduct = new Products();
      newProduct.name = product.name;
      newProduct.description = product.description;
      newProduct.price = product.price;
      newProduct.imageUrl = product.imageUrl;
      newProduct.stock = product.stock;
      newProduct.category = category!;

      return newProduct;
    });

    await this.productsRepository.upsert(newProducts, ['name']);

    return 'Producto agregado';
  }

  async findAll(page: number = 1, limit: number = 5) {
    const [data, total] = await this.productsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: { category: true }, // si quieres devolver también la categoría
      order: { name: 'ASC' }, // opcional: ordenar por nombre
    });

    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data,
    };
  }

  async findOne(id: string) {
    return await this.productsRepository.findOne({
      where: { id },
      relations: { category: true },
    });
  }

  async createProduct(createProductDto: CreateProductDto) {
    const { categoryId, ...rest } = createProductDto;

    const product = this.productsRepository.create({
      ...rest,
      category: { id: categoryId },
    });

    const savedProduct = await this.productsRepository.save(product);

    return await this.productsRepository.findOne({
      where: { id: savedProduct.id },
      relations: { category: true },
    });
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    if (!updateProductDto || Object.keys(updateProductDto).length === 0) {
      throw new BadRequestException(
        'Debe proporcionar al menos un campo para actualizar el producto',
      );
    }

    const productExists = await this.productsRepository.findOne({
      where: { id },
    });
    if (!productExists) {
      throw new NotFoundException('Producto no encontrado');
    }

    await this.productsRepository.update({ id }, updateProductDto);

    const updatedProduct = await this.productsRepository.findOne({
      where: { id },
      relations: { category: true },
    });

    if (!updatedProduct) {
      throw new NotFoundException('No se pudo obtener el producto actualizado');
    }

    return updatedProduct;
  }

  async deleteProduct(id: string) {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) return null;
    await this.productsRepository.delete(id);
    return product;
  }
}
