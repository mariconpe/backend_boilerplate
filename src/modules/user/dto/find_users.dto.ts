import { IsOptional, IsString } from 'class-validator';

export class FindUsersDto {
  @IsOptional()
  @IsString()
  userName?: string;
}
