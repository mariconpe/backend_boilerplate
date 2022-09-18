import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from './errors/unauthorized.error';
import { User } from '../modules/user/entities/user.entity';
import { UserService } from '../modules/user/user.service';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';
import { prisma } from '@prisma/client';
import passport from 'passport';
import { UpdateUserDto } from 'src/modules/user/dto/update_user.dto';
import { UnauthorizedException } from '@nestjs/common/exceptions';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(login: UpdateUserDto): Promise<any> {
    const user = await this.userService.findByEmail(login.email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(
        login.password,
        user.password,
      );
      const payload: UserPayload = {
        sub: user.id,
        email: user.email,
        name: user.name,
      };

      if (isPasswordValid) {
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
    }

    throw new UnauthorizedException('Email ou senha incorretos.');
  }
}
