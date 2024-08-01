import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  limit?: number = 10; /*Default value */

  @IsOptional()
  @IsPositive()
  page?: number = 1;
}
