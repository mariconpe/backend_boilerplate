import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './auth/guards/jwt_auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { AccessGuard } from './auth/guards/access.guard';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MailModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AccessGuard,
    },
  ],
})
export class AppModule {}
