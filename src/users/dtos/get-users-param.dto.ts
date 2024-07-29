import { IsInt, IsOptional } from 'class-validator';

export class GetUsersParamDto {
  /*With the ? and the is optional decorator we ensure the id parameter can be optional. */
  @IsOptional()
  @IsInt()
  id?: number;
}
