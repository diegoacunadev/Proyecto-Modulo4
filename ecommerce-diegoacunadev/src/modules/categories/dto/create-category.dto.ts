import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class CreateCategoryDto {
  @IsString({ message: 'El id de la categoría debe ser una cadena de texto.' })
  @IsOptional()
  id?: string;

  @ApiProperty({
    example: 'Monitores*',
    description: 'aqui va la descripcion',
  })
  @IsString({
    message: 'El nombre de la categoría debe ser una cadena de texto.',
  })
  @IsNotEmpty({ message: 'El nombre de la categoría es obligatorio.' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
  @MaxLength(50, { message: 'El nombre no debe superar los 50 caracteres.' })
  name: string;
}
