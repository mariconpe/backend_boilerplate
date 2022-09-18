import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Access } from '@prisma/client';

@Injectable()
export class AccessGuard extends AuthGuard('jwt') implements CanActivate {
  public constructor(private readonly reflector: Reflector) {
    super(reflector);
  }
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredAccess = this.reflector.getAllAndOverride<Access[]>(
      'accesses',
      [context.getHandler(), context.getClass()],
    );
    const { user } = context.switchToHttp().getRequest();
    if (!requiredAccess) {
      return true;
    }

    await super.canActivate(context);
    return requiredAccess.some((access) => user.access.includes(access));
  }
}
