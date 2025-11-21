import {
  IsUUID,
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

class ProductItemDto {
  @IsString({ message: 'El id del producto debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El id del producto no puede estar vacío.' })
  id: string;
}

export class CreateOrderDto {
  @IsUUID('4', { message: 'El userId debe tener un formato UUID válido.' })
  @IsNotEmpty({ message: 'El userId es obligatorio.' })
  userId: string;

  @IsArray({ message: 'El campo products debe ser un arreglo.' })
  @ArrayMinSize(1, {
    message: 'Debe incluir al menos un producto en la orden.',
  })
  @ValidateNested({ each: true })
  @Type(() => ProductItemDto)
  products: ProductItemDto[];
}
