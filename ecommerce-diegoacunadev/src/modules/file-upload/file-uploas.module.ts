import { Module } from '@nestjs/common';
import { FileUploasService } from './file-uploas.service';
import { FileUploasController } from './file-uploas.controller';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { FileUploadRepository } from './file-upload.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([FileUploadRepository]), ProductsModule],
  controllers: [FileUploasController],
  providers: [FileUploasService, CloudinaryConfig, FileUploadRepository],
})
export class FileUploasModule {}
