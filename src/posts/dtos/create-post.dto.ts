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
  ValidateNested,
} from 'class-validator';
import { postType } from '../enums/postType.enum';
import { postStatus } from '../enums/postStatus.enum';
import { CreatePostMetaoptionsDto } from './create-post-meta-options.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'This is the title for the blog post.',
    example: 'This is an example title.',
  })
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    enum: postType,
    description: "Possible values: 'post','page','story','series'",
  })
  @IsEnum(postType)
  @IsNotEmpty()
  postType: postType;

  @ApiProperty({
    description: "For example - 'my-url'",
    example: 'my-blog-post',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces. For example "my-url',
  })
  slug: string;

  @ApiProperty({
    enum: postStatus,
    description: "Possible values: 'draft','scheduled','review','published'",
  })
  @IsEnum(postStatus)
  @IsNotEmpty()
  status: postStatus;

  @ApiPropertyOptional({
    description: 'This is the content of the post',
    example: 'The post content',
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    description:
      'Serialize your JSON object else a validation error will be thrown.',
    example:
      '{\r\n "@context": "https://schema.org",\r\n "@type": "Person"\r\n}',
  })
  @IsJSON()
  @IsOptional()
  schema?: string;

  @ApiPropertyOptional({
    description: 'Featured image for your blog post',
    example: 'http://localhost.com/images/image1.jpg',
  })
  @IsUrl()
  @IsOptional()
  featuredImageUrl?: string;

  @ApiPropertyOptional({
    description: 'The date on which the blog post is published.',
    example: '2024-03-16T07:46:32+0000',
  })
  /*Validates with this format.*/
  @IsISO8601()
  @IsOptional()
  publishOn?: Date;

  @ApiPropertyOptional({
    description: 'Array of tags passed as string values.',
    example: ['nestjs', 'typescript'],
  })
  @IsArray()
  @IsOptional()
  /*Check if all the values of the array are strings. */
  @IsString({ each: true })
  /*Check if all the values of the array have minimun 3 characters. */
  @MinLength(3, { each: true })
  tags?: string[];

  @ApiPropertyOptional({
    type: 'array',
    required: false,
    items: {
      type: 'object',
      properties: {
        key: {
          type: 'string',
          description:
            'The key can be any string identifier for your meta option',
          example: 'sidebarEnabled',
        },
        value: {
          type: 'any',
          description: 'Any value that you want to save to the key',
          example: true,
        },
      },
    },
    description: '',
  })

  /*Nest dto */
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaoptionsDto)
  metaOptions?: CreatePostMetaoptionsDto[];
}
