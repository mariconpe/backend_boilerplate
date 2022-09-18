import { Param, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/decorators/is_public.decorator';
import { MailService } from './mail.service';

@Controller()
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @ApiOperation({ summary: 'Envia e-mail com nova senha para o usuário.' })
  @Post('forgot-password/:id')
  public async sendNewPasswrod(@Param() id: string): Promise<any> {
    return this.mailService.sendNewPassword(id);
  }
}
