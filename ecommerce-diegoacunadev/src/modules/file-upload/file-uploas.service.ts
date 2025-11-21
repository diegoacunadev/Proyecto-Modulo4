import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from '../products/entities/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploasService {
  constructor(
    private readonly filesUploadRepository: FileUploadRepository,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async uploadImage(file: Express.Multer.File, id: string) {
    const product = await this.productsRepository.findOneBy({ id: id });

    if (!product) {
      throw new NotFoundException('Producto no existe');
    }

    const uploadResponse = await this.filesUploadRepository.uploadImage(file);

    await this.productsRepository.update(product.id, {
      imageUrl: uploadResponse.secure_url,
    });

    return await this.productsRepository.findOneBy({ id: id });
  }
}
