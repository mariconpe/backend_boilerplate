import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserWithoutPassword } from 'src/modules/user/entities/user_without_password.entity';

const getCurrentUserByContext = (
  context: ExecutionContext,
): UserWithoutPassword => {
  return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
