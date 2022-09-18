import { Prisma, Access } from '@prisma/client';

export class User implements Prisma.UserUncheckedCreateInput {
  id: string;

  access: Access;

  email: string;

  password: string;

  name: string;

  role: string;

  createdAt?: string | Date;

  updatedAt?: string | Date;
}
