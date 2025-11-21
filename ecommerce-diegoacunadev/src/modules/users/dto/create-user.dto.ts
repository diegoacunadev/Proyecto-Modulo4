import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
  IsNumberString,
  Validate,
} from 'class-validator';
import { MatchPassword } from 'src/helpers/matchPassword';

export class CreateUserDto {
  @ApiProperty({
    example: 'Diego Acuña',
    description: 'aqui va el nombre',
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
  @MaxLength(80, { message: 'El nombre no debe superar los 80 caracteres.' })
  name: string;

  @ApiProperty({
    example: 'diego@gmail.com',
    description: 'aqui va el correo',
  })
  @IsEmail({}, { message: 'El correo electrónico no tiene un formato válido.' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio.' })
  email: string;

  @ApiProperty({
    example: 'Diego123*',
    description: 'aqui va la contraseña',
  })
  @IsString()
  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
  @MaxLength(15, {
    message: 'La contraseña no debe superar los 15 caracteres.',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
    message:
      'La contraseña debe incluir al menos una letra minúscula, una mayúscula, un número y un carácter especial (!@#$%^&*).',
  })
  password: string;

  @ApiProperty({
    example: 'Diego123*',
    description: 'Confrima la contraseña',
  })
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;

  @ApiProperty({
    example: 'Calle 123 # 59 - 10',
    description: 'aqui va la direccion',
  })
  @IsString()
  @IsNotEmpty({ message: 'La dirección es obligatoria.' })
  @MinLength(3, { message: 'La dirección debe tener al menos 3 caracteres.' })
  @MaxLength(80, { message: 'La dirección no debe superar los 80 caracteres.' })
  address: string;

  @ApiProperty({
    example: '573176311085',
    description: 'aqui va el telefono',
  })
  @IsNumberString(
    {},
    { message: 'El número de teléfono debe ser un valor numérico.' },
  )
  @IsNotEmpty({ message: 'El número de teléfono es obligatorio.' })
  phone: string;

  @ApiProperty({
    example: 'Colombia',
    description: 'aqui va el pais',
  })
  @IsString()
  @MinLength(5, { message: 'El país debe tener al menos 5 caracteres.' })
  @MaxLength(20, { message: 'El país no debe superar los 20 caracteres.' })
  country?: string;

  @ApiProperty({
    example: 'Cali',
    description: 'aqui va la ciudad',
  })
  @IsString()
  @MinLength(5, { message: 'La ciudad debe tener al menos 5 caracteres.' })
  @MaxLength(20, { message: 'La ciudad no debe superar los 20 caracteres.' })
  city?: string;
}

export class LoginUserDto extends PickType(CreateUserDto, [
  'password',
  'email',
]) {}
