import { IsOptional, IsString } from 'class-validator';

enum PostType {
  post,
  page,
  story,
  series,
}
enum Status {
  draft,
  scheduled,
  review,
  published,
}

export class CreatePostDto {
  @IsString()
  title: string;
  postType: PostType;

  @IsString()
  slug: string;
  status: Status;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsOptional()
  schema?: string;

  @IsString()
  @IsOptional()
  featuredImageUrl?: string;
  publishon: Date;
  tags: string[];
  metaOptions: [];
}
