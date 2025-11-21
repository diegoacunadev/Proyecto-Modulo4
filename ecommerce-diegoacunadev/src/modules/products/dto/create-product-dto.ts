import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty({
    example: 'Iphone 17 Pro Max Ultra',
    description: 'Nombre del producto',
  })
  @IsString({ message: 'El nombre del producto debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre del producto es obligatorio.' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
  @MaxLength(100, { message: 'El nombre no debe superar los 100 caracteres.' })
  name: string;

  @ApiProperty({
    example: 'Este es el nuevo celular lanzado este año',
    description: 'Descripción del producto',
  })
  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La descripción es obligatoria.' })
  @MinLength(10, {
    message: 'La descripción debe tener al menos 10 caracteres.',
  })
  @MaxLength(500, {
    message: 'La descripción no debe superar los 500 caracteres.',
  })
  description: string;

  @ApiProperty({
    example: '799.55',
    description: 'Precio del producto',
  })
  @IsNumber({}, { message: 'El precio debe ser un número.' })
  @IsPositive({ message: 'El precio debe ser mayor que 0.' })
  price: number;

  @ApiProperty({
    example: '100',
    description: 'Ingresa la cantidad de stock que tengas',
  })
  @IsNumber({}, { message: 'El stock debe ser un número.' })
  @IsPositive({ message: 'El stock debe ser mayor que 0.' })
  stock: number;

  @ApiProperty({
    example: 'aqui UUID de la categoria',
    description: 'Ingresa el id de la categoria a la que pertenece',
  })
  @IsString({ message: 'El ID de la categoría debe ser una cadena de texto.' })
  @IsOptional()
  categoryId?: string;

  @ApiProperty({
    example: 'Url del producto',
    description: 'aqui debes de cargar imagen del producto',
  })
  @IsString({ message: 'La URL de la imagen debe ser una cadena de texto.' })
  @IsOptional()
  imageUrl?: string;
}
