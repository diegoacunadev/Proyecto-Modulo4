import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  //cargar todos los usuarios
  async findAll(page: number = 1, limit: number = 5) {
    const [users, total] = await this.usersRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { name: 'ASC' },
    });

    const sanitizedUsers = users.map(({ password, ...user }) => user);

    return {
      total,
      page,
      limit,
      data: sanitizedUsers,
    };
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        orders: true,
      },
    });
    if (!user) return null;

    const { password, ...result } = user;

    return result;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    if (!updateUserDto || Object.keys(updateUserDto).length === 0) {
      throw new BadRequestException(
        'Debe proporcionar al menos un campo para actualizar',
      );
    }

    const userExists = await this.usersRepository.findOne({ where: { id } });
    if (!userExists) {
      throw new NotFoundException('Usuario no encontrado');
    }

    await this.usersRepository.update(id, updateUserDto);

    const updatedUser = await this.usersRepository.findOne({ where: { id } });
    if (!updatedUser) {
      throw new NotFoundException(
        'Usuario no encontrado después de la actualización',
      );
    }

    const { password, ...result } = updatedUser;
    return result;
  }

  async deleteUser(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    await this.usersRepository.delete(id);

    const { password, ...result } = user;
    return result;
  }
}
