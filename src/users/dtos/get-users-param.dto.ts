import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class GetUsersParamDto {
  @ApiPropertyOptional({
    description: 'Get user with a specific id',
    example: 1234,
  })
  /*With the ? and the is optional decorator we ensure the id parameter can be optional. */
  @IsOptional()
  @IsInt()
  /*Adding this decorator we ensure the id transforms to Number  */
  @Type(() => Number)
  id?: number;
}
