import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, LoginUserDto } from '../users/dto/create-user.dto';
import { Users } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser)
      throw new ConflictException('El correo ya está registrado');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const hastedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser: Users = this.usersRepository.create({
      ...createUserDto,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      password: hastedPassword,
    });

    return this.usersRepository.save(newUser);
  }

  async signIn(credentials: LoginUserDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: credentials.email },
    });

    if (!existingUser)
      throw new ConflictException('Revisa los datos ingresados');

    const matchigPasswords = await bcrypt.compare(
      credentials.password,
      existingUser.password,
    );

    if (!matchigPasswords) throw new BadRequestException('Datos incorrectos');

    //devolver todo
    const payload = {
      id: existingUser.id,
      email: existingUser.email,
      isAdmin: existingUser.isAdmin,
    };

    const token = this.jwtService.sign(payload);

    return { login: true, access_token: token };
  }
}
