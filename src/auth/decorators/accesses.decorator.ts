import { SetMetadata } from '@nestjs/common';
import { Access } from '@prisma/client';

export const Accesses = (...access: Access[]) =>
  SetMetadata('accesses', access);
