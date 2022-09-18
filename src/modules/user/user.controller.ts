import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateUserRoleDto } from './dto/update_user_role.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { UserWithoutPassword } from './entities/user_without_password.entity';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create_user.dto';
import { IsPublic } from 'src/auth/decorators/is_public.decorator';
import { Access } from '@prisma/client';
import { Accesses } from 'src/auth/decorators/accesses.decorator';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Cadastra novo usuário.' })
  @IsPublic()
  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.createUser(user);
  }

  @ApiOperation({ summary: 'Retorna todos os usuários.' })
  @Accesses(Access.MASTER)
  @Get()
  findAllUsers(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @ApiOperation({ summary: 'Encontra o usuário pela ID.' })
  @ApiBearerAuth()
  @Get(':id')
  async findById(@Param('id') id: string): Promise<UserWithoutPassword> {
    return this.userService.findById(id);
  }

  @ApiOperation({ summary: 'Atualiza os dados de um usuário.' })
  @ApiBearerAuth()
  @Patch()
  updateUser(
    // @Req() request: Request,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserWithoutPassword> {
    // const id = request.user['id'];

    return this.userService.updateUser(updateUserDto.id, updateUserDto);
  }

  @ApiOperation({ summary: 'Adm define a role do usuário.' })
  @Patch('access')
  updateUserRole(
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ): Promise<UserWithoutPassword> {
    return this.userService.updateUserRole(updateUserRoleDto);
  }

  @ApiOperation({ summary: 'Adm deleta um usuário.' })
  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
