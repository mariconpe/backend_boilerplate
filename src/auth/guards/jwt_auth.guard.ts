// NestJS
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// Password
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
// Decorators
import { IS_PUBLIC_KEY } from '../decorators/is_public.decorator';
// Error Handling

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): Promise<boolean> | boolean | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}
