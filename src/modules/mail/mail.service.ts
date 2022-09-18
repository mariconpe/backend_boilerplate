import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { generate } from 'generate-password';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private prisma: PrismaService,
  ) {}

  async sendNewPassword(id: string): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
    const newPassword = generate({
      length: 8,
      numbers: true,
    });
    return this.newPasswordEmail(newPassword, user.email, user.name);
  }

  private async newPasswordEmail(
    newPassword: string,
    email: string,
    name: string,
  ) {
    await this.mailerService.sendMail({
      to: email,
      subject: `Olá, ${name}! Foi solicitada uma alteração de senha para você. Aqui está sua nova senha: ${newPassword}.`,
      template: './newPassword',
    });
  }
}
