import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [PrismaModule, AuthModule],
  exports: [UserService],
})
export class UserModule {}
