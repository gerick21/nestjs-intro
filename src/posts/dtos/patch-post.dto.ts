import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';
import { IsInt, isInt, IsNotEmpty } from 'class-validator';

export class PatchPostDto extends PartialType(CreatePostDto) {
  @ApiProperty({
    description: 'The ID of the post that needs to be updated.',
    example: 123,
  })
  @IsInt()
  @IsNotEmpty()
  id: number;
}
