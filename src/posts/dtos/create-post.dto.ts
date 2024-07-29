import {
  IsArray,
  IsDate,
  IsEnum,
  IsISO8601,
  IsJSON,
  isJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MinLength,
} from 'class-validator';
import { postType } from '../enums/postType.enum';
import { postStatus } from '../enums/postStatus.enum';

export class CreatePostDto {
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  title: string;

  @IsEnum(postType)
  @IsNotEmpty()
  postType: postType;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces. For example "my-url',
  })
  slug: string;

  @IsEnum(postStatus)
  @IsNotEmpty()
  status: postStatus;

  @IsString()
  @IsOptional()
  content?: string;

  @IsJSON()
  @IsOptional()
  schema?: string;

  @IsUrl()
  @IsOptional()
  featuredImageUrl?: string;

  /*Validates with this format.*/
  @IsISO8601()
  @IsOptional()
  publishOn?: Date;

  @IsArray()
  @IsOptional()
  /*Check if all the values of the array are strings. */
  @IsString({ each: true })
  /*Check if all the values of the array have minimun 3 characters. */
  @MinLength(3, { each: true })
  tags: string[];

  metaOptions: [{ key: 'sidebarEnabled'; value: true }];
}
