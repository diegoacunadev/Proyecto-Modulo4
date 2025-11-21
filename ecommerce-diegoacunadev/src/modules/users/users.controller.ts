import {
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Body,
  Query,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../../guards/auth.guards';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/guards/roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { PaginationQueryDto } from 'src/common/pagination-query.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado con éxito.',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' }) //guardian
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    const { page, limit } = paginationQuery;

    return this.usersService.findAll(page, limit);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard) //guardian
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Put('update/:id')
  @UseGuards(AuthGuard) //guardian
  @ApiBearerAuth()
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = await this.usersService.updateUser(id, updateUserDto);
    return {
      statusCode: 200,
      message: 'Usuario actualizado con éxito',
      datosDeUsuario: updatedUser,
    };
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard) //guardian
  @ApiBearerAuth()
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const deletedUser = await this.usersService.deleteUser(id);
      return {
        statusCode: 200,
        message: 'Usuario eliminado con éxito',
        datosDeUsuario: deletedUser,
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: 'Error eliminando usuario',
        datosDeUsuario: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
