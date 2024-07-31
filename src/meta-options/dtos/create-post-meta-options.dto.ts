import { IsJSON, IsNotEmpty } from 'class-validator';

export class CreatePostMetaoptionsDto {
  @IsNotEmpty()
  @IsJSON()
  metaValue: string;
}
