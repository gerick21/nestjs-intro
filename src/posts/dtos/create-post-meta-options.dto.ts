import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostMetaoptionsDto {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsNotEmpty()
  value: any; /*value can be a string, int, boolean etc. */
}
