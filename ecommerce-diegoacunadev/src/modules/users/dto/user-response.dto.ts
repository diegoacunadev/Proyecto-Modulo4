import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    example: 'a1b2c3d4-e5f6-4a7b-8c9d-1234567890ab',
    description: 'Identificador único del usuario (UUID).',
  })
  id: string;

  @ApiProperty({
    example: 'Diego Acuña',
    description: 'Nombre completo del usuario.',
  })
  name: string;

  @ApiProperty({
    example: 'diego@gmail.com',
    description: 'Correo electrónico único del usuario.',
  })
  email: string;

  @ApiProperty({
    example: '573176311085',
    description: 'Número de teléfono del usuario.',
    type: String,
  })
  phone: string;

  @ApiProperty({
    example: 'Colombia',
    description: 'País de residencia del usuario.',
  })
  country: string;

  @ApiProperty({
    example: 'Cali',
    description: 'Ciudad de residencia del usuario.',
  })
  city: string;

  @ApiProperty({
    example: 'Calle 123 # 59 - 10',
    description: 'Dirección de residencia del usuario.',
  })
  address: string;

  @ApiProperty({
    example: true,
    description: 'Indica si el usuario tiene privilegios de administrador.',
    default: false,
    type: Boolean,
  })
  isAdmin: boolean;

  @ApiProperty({
    type: 'array',
    description: 'Lista de órdenes asociadas a este usuario.',
    // Si tienes un DTO para Order (ej: OrderResponseDto), usa:
    // items: { $ref: getSchemaPath(OrderResponseDto) },
    items: {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'order-uuid-1' },
        total: { type: 'number', example: 120.5 },
        // ... otros campos clave de la orden
      },
    },
  })
  orders: any[];
}
