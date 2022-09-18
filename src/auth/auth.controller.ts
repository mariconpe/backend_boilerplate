import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is_public.decorator';
import { JwtAuthGuard } from './guards/jwt_auth.guard';
import { UpdateUserDto } from 'src/modules/user/dto/update_user.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary:
      'Gera o token de autenticação do usuário ao enviar dados para login.',
  })
  @IsPublic()
  async validateUser(@Body() { email, password }: UpdateUserDto) {
    return this.authService.validateUser({ email, password });
  }
}
