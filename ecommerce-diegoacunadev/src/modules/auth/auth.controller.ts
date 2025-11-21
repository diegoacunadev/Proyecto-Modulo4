import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.createUser(createUserDto);
    const { password, ...result } = user;

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Usuario creado con éxito',
      data: result,
    };
  }

  @Post('signin')
  signIn(@Body() credentials: LoginUserDto) {
    return this.authService.signIn(credentials);
  }
}
