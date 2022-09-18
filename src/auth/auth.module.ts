import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [AuthController],
  imports: [
    PrismaModule,
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthModule, AuthService],
})
export class AuthModule {}
