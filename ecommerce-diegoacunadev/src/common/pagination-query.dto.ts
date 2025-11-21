import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationQueryDto {
  @ApiProperty({
    description: 'Número de página a recuperar (inicia en 1).',
    required: true,
    default: 1,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsPositive({ message: 'La página debe ser un número positivo.' })
  page?: number = 1;

  @ApiProperty({
    description: 'Límite de registros por página.',
    required: true,
    default: 5,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @Min(1, { message: 'El límite debe ser al menos 1.' })
  limit?: number = 5;
}
