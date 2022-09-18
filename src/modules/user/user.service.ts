import {
  Body,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hash } from 'bcryptjs';
import { hashConfig } from 'src/config/hash.config';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateUserRoleDto } from './dto/update_user_role.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { UserWithoutPassword } from './entities/user_without_password.entity';
import { User } from './entities/user.entity';
import { AlreadyExistsException } from 'src/exceptions/already_exists.exception';
import { CreateUserDto } from './dto/create_user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(user: CreateUserDto): Promise<User> {
    const userExists = await this.prisma.user.findFirst({
      where: {
        email: user.email,
      },
    });

    if (userExists) {
      throw new AlreadyExistsException('Usuário já cadastrado.');
    }

    const hashedPassword = await hash(user.password, hashConfig.saltRounds);
    return this.prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });
  }

  async findAllUsers(): Promise<User[]> {
    return await this.prisma.user.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findById(id: string): Promise<UserWithoutPassword> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    delete user.password;

    if (!user) {
      throw new NotFoundException('Usuário não encontrado pela ID.');
    }

    return { ...user };
  }

  async updateUser(
    @Body() id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserWithoutPassword> {
    const user = await this.prisma.user.update({
      where: { id },
      data: { ...updateUserDto },
    });

    delete user.password;

    return { ...user };
  }

  async updateUserRole(
    updateUserRoleDto: UpdateUserRoleDto,
  ): Promise<UserWithoutPassword> {
    const user = await this.prisma.user.update({
      where: { email: updateUserRoleDto.email },
      data: { access: updateUserRoleDto.access },
    });

    delete user.password;

    return user;
  }

  async deleteUser(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
